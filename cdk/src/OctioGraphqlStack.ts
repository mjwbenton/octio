import { Duration, Fn, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import * as path from "path";
import { FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import {
  AllowedMethods,
  CachePolicy,
  Distribution,
  OriginProtocolPolicy,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { ITable } from "aws-cdk-lib/aws-dynamodb";

const HOSTED_ZONE = "mattb.tech";
const HOSTED_ZONE_ID = "Z2GPSB1CDK86DH";
const DOMAIN_NAME = "graphql.octio.mattb.tech";

export default class OctioGraphqlStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    {
      consumptionTable,
      gridTable,
    }: { consumptionTable: ITable; gridTable: ITable },
  ) {
    super(scope, id);

    const lambda = new NodejsFunction(this, "Lambda", {
      entry: path.join(__dirname, "../../graphql/dist/index.js"),
      handler: "handler",
      bundling: {
        target: "es2021",
        environment: {
          NODE_ENV: "production",
        },
      },
      timeout: Duration.seconds(10),
      runtime: Runtime.NODEJS_18_X,
      memorySize: 1024,
      environment: {
        CONSUMPTION_TABLE: consumptionTable.tableName,
        GRID_TABLE: gridTable.tableName,
      },
    });
    const url = lambda.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });
    consumptionTable.grantReadData(lambda);
    gridTable.grantReadData(lambda);

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, "HostedZone", {
      hostedZoneId: HOSTED_ZONE_ID,
      zoneName: HOSTED_ZONE,
    });

    const certificate = new Certificate(this, "Certificate", {
      domainName: DOMAIN_NAME,
      validation: CertificateValidation.fromDns(hostedZone),
    });

    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new HttpOrigin(Fn.select(2, Fn.split("/", url.url)), {
          protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
          httpsPort: 443,
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
        allowedMethods: AllowedMethods.ALLOW_ALL,
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
      },
      certificate,
      domainNames: [DOMAIN_NAME],
    });

    new ARecord(this, "DomainRecord", {
      zone: hostedZone,
      recordName: DOMAIN_NAME,
      ttl: Duration.minutes(5),
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });
  }
}

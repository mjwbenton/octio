import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
  _FieldSet: { input: any; output: any };
};

export type ElectricityPoint = {
  emissions: Scalars["Float"]["output"];
  missingData: Scalars["Boolean"]["output"];
  usage: Scalars["Float"]["output"];
};

export type EnergyPeriod = {
  electricity: ElectricityPoint;
  endDate: Scalars["DateTime"]["output"];
  gas: GasPoint;
  startDate: Scalars["DateTime"]["output"];
};

export type EnergyResult = {
  electricity: ElectricityPoint;
  endDate: Scalars["DateTime"]["output"];
  gas: GasPoint;
  periods: Array<EnergyPeriod>;
  startDate: Scalars["DateTime"]["output"];
};

export type GasPoint = {
  missingData: Scalars["Boolean"]["output"];
  usage: Scalars["Float"]["output"];
};

export type Query = {
  energy: EnergyResult;
};

export type QueryEnergyArgs = {
  endDate: Scalars["DateTime"]["input"];
  startDate: Scalars["DateTime"]["input"];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  ElectricityPoint: ResolverTypeWrapper<ElectricityPoint>;
  Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  EnergyPeriod: ResolverTypeWrapper<EnergyPeriod>;
  EnergyResult: ResolverTypeWrapper<EnergyResult>;
  GasPoint: ResolverTypeWrapper<GasPoint>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DateTime: Scalars["DateTime"]["output"];
  ElectricityPoint: ElectricityPoint;
  Float: Scalars["Float"]["output"];
  Boolean: Scalars["Boolean"]["output"];
  EnergyPeriod: EnergyPeriod;
  EnergyResult: EnergyResult;
  GasPoint: GasPoint;
  Query: {};
  String: Scalars["String"]["output"];
}>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type ElectricityPointResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ElectricityPoint"] = ResolversParentTypes["ElectricityPoint"],
> = ResolversObject<{
  emissions?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  missingData?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  usage?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnergyPeriodResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["EnergyPeriod"] = ResolversParentTypes["EnergyPeriod"],
> = ResolversObject<{
  electricity?: Resolver<
    ResolversTypes["ElectricityPoint"],
    ParentType,
    ContextType
  >;
  endDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  gas?: Resolver<ResolversTypes["GasPoint"], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnergyResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["EnergyResult"] = ResolversParentTypes["EnergyResult"],
> = ResolversObject<{
  electricity?: Resolver<
    ResolversTypes["ElectricityPoint"],
    ParentType,
    ContextType
  >;
  endDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  gas?: Resolver<ResolversTypes["GasPoint"], ParentType, ContextType>;
  periods?: Resolver<
    Array<ResolversTypes["EnergyPeriod"]>,
    ParentType,
    ContextType
  >;
  startDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GasPointResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["GasPoint"] = ResolversParentTypes["GasPoint"],
> = ResolversObject<{
  missingData?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  usage?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  energy?: Resolver<
    ResolversTypes["EnergyResult"],
    ParentType,
    ContextType,
    RequireFields<QueryEnergyArgs, "endDate" | "startDate">
  >;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  ElectricityPoint?: ElectricityPointResolvers<ContextType>;
  EnergyPeriod?: EnergyPeriodResolvers<ContextType>;
  EnergyResult?: EnergyResultResolvers<ContextType>;
  GasPoint?: GasPointResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

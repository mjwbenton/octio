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

export type Energy = {
  electricity: EnergyPoint;
  endDate: Scalars["DateTime"]["output"];
  gas: EnergyPoint;
  periods: Array<EnergyPeriod>;
  startDate: Scalars["DateTime"]["output"];
};

export type EnergyPeriod = {
  electricity: EnergyPoint;
  endDate: Scalars["DateTime"]["output"];
  gas: EnergyPoint;
  startDate: Scalars["DateTime"]["output"];
};

export type EnergyPoint = {
  emissions: Scalars["Float"]["output"];
  missingData: Scalars["Boolean"]["output"];
  mix: Array<FuelMix>;
  usage: Scalars["Float"]["output"];
};

export type FuelMix = {
  fuel: Scalars["String"]["output"];
  percentage: Scalars["Float"]["output"];
};

export type Query = {
  energy: Energy;
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
  Energy: ResolverTypeWrapper<Energy>;
  EnergyPeriod: ResolverTypeWrapper<EnergyPeriod>;
  EnergyPoint: ResolverTypeWrapper<EnergyPoint>;
  Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  FuelMix: ResolverTypeWrapper<FuelMix>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Query: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DateTime: Scalars["DateTime"]["output"];
  Energy: Energy;
  EnergyPeriod: EnergyPeriod;
  EnergyPoint: EnergyPoint;
  Float: Scalars["Float"]["output"];
  Boolean: Scalars["Boolean"]["output"];
  FuelMix: FuelMix;
  String: Scalars["String"]["output"];
  Query: {};
}>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type EnergyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Energy"] = ResolversParentTypes["Energy"],
> = ResolversObject<{
  electricity?: Resolver<
    ResolversTypes["EnergyPoint"],
    ParentType,
    ContextType
  >;
  endDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  gas?: Resolver<ResolversTypes["EnergyPoint"], ParentType, ContextType>;
  periods?: Resolver<
    Array<ResolversTypes["EnergyPeriod"]>,
    ParentType,
    ContextType
  >;
  startDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnergyPeriodResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["EnergyPeriod"] = ResolversParentTypes["EnergyPeriod"],
> = ResolversObject<{
  electricity?: Resolver<
    ResolversTypes["EnergyPoint"],
    ParentType,
    ContextType
  >;
  endDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  gas?: Resolver<ResolversTypes["EnergyPoint"], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnergyPointResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["EnergyPoint"] = ResolversParentTypes["EnergyPoint"],
> = ResolversObject<{
  emissions?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  missingData?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  mix?: Resolver<Array<ResolversTypes["FuelMix"]>, ParentType, ContextType>;
  usage?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FuelMixResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FuelMix"] = ResolversParentTypes["FuelMix"],
> = ResolversObject<{
  fuel?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  percentage?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  energy?: Resolver<
    ResolversTypes["Energy"],
    ParentType,
    ContextType,
    RequireFields<QueryEnergyArgs, "endDate" | "startDate">
  >;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Energy?: EnergyResolvers<ContextType>;
  EnergyPeriod?: EnergyPeriodResolvers<ContextType>;
  EnergyPoint?: EnergyPointResolvers<ContextType>;
  FuelMix?: FuelMixResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

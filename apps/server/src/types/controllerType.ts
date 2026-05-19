import { Request } from 'express';

export type ControllerRequest<
  Params extends object = object,
  Body extends object = object,
  Query extends object = object,
> = Request<Params, unknown, Body, Query>;

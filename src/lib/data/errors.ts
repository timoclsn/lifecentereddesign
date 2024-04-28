export class ServerActionError extends Error {
  public override readonly cause?: Error;
  public readonly log?;

  constructor(opts: { message: string; log?: string; cause?: Error }) {
    super(opts.message);
    this.name = 'ServerActionError';
    this.message = opts.message;
    this.log = opts.log;
    this.cause = opts.cause;
  }
}

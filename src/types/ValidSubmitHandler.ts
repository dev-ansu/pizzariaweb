export type ValidSubmitHandler<T> = (
  data: T
) => 
  | { ok: true; message: string }
  | { ok: false; fieldErrors: { key: string; message: string }[] }
;
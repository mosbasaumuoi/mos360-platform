import {

  cacheEngine

}

  from "./cacheEngine.js";

export function createRuntimeContext(

  request,
  env

) {

  const url =

    new URL(
      request.url
    );

  return {

    env,

    request,

    url,

    cache:
      cacheEngine
  };
}
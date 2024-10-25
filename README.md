# Custom Service Worker Environment Variables

This is a simple example of how to use environment variables in a custom service worker.

The trick is about augmenting the global `ServiceWorkerGlobalScope` interface to declare the environment variables. Check the global scope in the  [service worker]('src/service-worker/sw.ts') file:

```ts
declare global {
  interface ServiceWorkerGlobalScope {
    __VARA: string
    __VARB: string
  }
}
```

Then you can replace those environment variables later in your docker image via some shell script. The service worker will have always those variables available:

```js
self.__VARA="vara";self.__VARB="varb";
```

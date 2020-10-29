let fib;
let wasm_ready = false;
let resolvers = [];

function ready() {
  if (!!wasm_ready) {
    return true;
  }
  return new Promise(
    resolve => resolvers.push(resolve),
  );
}

async function load_fib() {
  if (!!fib) {
    return fib;
  }
  importScripts("./fib.js");
  Module.onRuntimeInitialized = () => {
    wasm_ready = true;
    resolvers.forEach(resolve => resolve());
  };
  await ready();
  fib = Module._fib;
  return fib;
}

onmessage = async event => {
  const fib = await load_fib();
  const { input, id } = event.data;
  const result = fib(input);
  postMessage({ result, id });
};

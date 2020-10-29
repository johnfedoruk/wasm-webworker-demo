CC=em++
CFLAGS=-s WASM=1 -s EXPORTED_FUNCTIONS="[_fib]"

all: fib.js

fib.js: fib.cpp $(DEPS)
	$(CC) -o $@ $< $(CFLAGS)

clean:
	rm fib.js fib.wasm
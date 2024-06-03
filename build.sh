#!/bin/sh

# Build wasm module
set -xe

clang \
    -Wall \
    -Wextra \
    -I3dparty/caifu/lemon \
    -I3dparty/caifu \
    --target=wasm32 \
    -o blueberry.o \
    -c ./src/c/blueberry.c \

wasm-ld \
    -m wasm32 \
    --no-entry --export-all --allow-undefined \
    -o dist/blueberry.wasm blueberry.o \

rm blueberry.o
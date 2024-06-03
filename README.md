# blueb.js 🫐
blueb.js - very simple neural network framework npm package, powered by **wasm**.

### Overview
Underhood **blueb.js** uses my C stb style single-header [**blueberry.h**](https://github.com/Maksasj/caifu) library as neural network framework, as well as some other utility C libraries such as **lemon.h** and **peach.h**, for memory allocations and linear algebra functionality respectively.

*Higly inspired by tsodings **nn** library [github.com/tsoding/nn.h](https://github.com/tsoding/nn.h)*

> Sadly this time blueb.js is a NEW javascript framework btw.

### Links
1. Live demonstration of a web application what uses **blueb.js** [maksasj.github.io/nnate](https://maksasj.github.io/nnate/)
2. Node package page [npmjs.com/package/blueb.js](https://www.npmjs.com/package/blueb.js)
3. Source code avaiable at [github.com/Maksasj/blueb.js](https://github.com/Maksasj/)
4. **blueberry.h** and other C libraries source code [github.com/Maksasj/caifu](https://github.com/Maksasj/caifu)


Cool looking widgets 
<img src="https://img.shields.io/github/license/Maksasj/blueb.js" alt="license">
<img src="https://img.shields.io/github/v/release/Maksasj/blueb.js" alt="version">
![NPM Version](https://img.shields.io/npm/v/blueb.js)

## Build
1. **Build manually**<br>
    First of all requirements:
    - Clang 14.0.0
    - wasm-ld 
    - Node (Have test with Node v20.11.0) 
    
    Building process involves building **wasm** and node package, in root directory you can find a `bash.sh` file. This bash script can be used for building a wasm module.
    
    ```bash
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

    # Delete temporary object file
    rm blueberry.o
    ```

    Therefore **node** package could be builded with simple, command. 

    ```bash
    npm run build
    ```

    Actually above command will automatically try to build **wasm** file and node package and put everything into *dist* folder.

## License
**blueb.js** is free and open source library/package. All code in this repository is licensed under
- MIT License ([LICENSE.md](https://github.com/Maksasj/nnate/blob/master/LICENSE.md) or https://opensource.org/license/mit/)
'use client'
import React from 'react'
import Typewriter from 'typewriter-effect';
interface Props {
    
}

const Descricao = (props: Props) => {
    return (
        <div>
            <Typewriter options={{
                loop: true,
            }}
            onInit={(typewriter) => {
                typewriter
                  .typeString("💻 Desenvolvido por Robervan Souza!!! 🚀🚀🚀")
                  .pauseFor(500)
                  .deleteAll()
                  .typeString("📸📸Crie sua imagem!!! 📸📸")
                  .pauseFor(500)
                  .deleteAll()
                  .typeString("🔐🔐 Entre com seu E-mail!!! 🔐 🔐 ")
                  .pauseFor(500)
                  .deleteAll()
                  .start();
            }}
            />
        </div>
    )
}

export default Descricao;

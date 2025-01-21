import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
//import $ from 'jquery'; 
import folder from "../images/folder.png"
import skills from "../images/skills.png"
import about from "../images/about.png"


import win98 from "../images/Icons/win98.png"
//import message from "../images/message.png"

//import marcador from "../images/marcador.png"
import close from "../images/close-icon.png";
import world from "../images/Icons/world98.png";

//import SelectionPage from './SelectionPage';
import "../components/About.css"
import { closeWindow, openWindow } from '../functions/eventsFunction';
import { titleEffect } from '../functions/eventsFunction';

import { FolderDecide } from '../functions/eventsFunction';
import { Default as ScrollViewComponent } from './MonitorComponent'; 


const About = (/*{setChange,handleClick}*/) => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [text2, setText2] = useState("");
    const [text3, setText3] = useState("");
    const [text4, setText4] = useState("");
    const [text5, setText5] = useState("");
    const [text6, setText6] = useState("");
    const [isAnimationActive, setIsAnimationActive] = useState(false);
    const [isDisintegrating, setIsDisintegrating] = useState(false);
    const [animationTyping, setAnimationTyping] = useState(false);
    const [animationTyping2, setAnimationTyping2] = useState(false);
    const audioElementRef = useRef(null);
    const [isAnimationActiveText] = useState(false);

    const [, setShowText] = useState(false);
    const iconRef = useRef(null);


    const handleClick = () => {
        setIsAnimationActive(true);
    };
    useEffect(() => {
        titleEffect();

    });
   /* useEffect(() => {
        if (animationTyping2) {
          // Activar la animación después de 11 segundos
          const timeout = setTimeout(() => {
            setIsAnimationActiveText(false);
          }, 1); // 11 segundos en milisegundos
          
          return () => clearTimeout(timeout);
        }
      }, [animationTyping2]); // Ejecutar cada vez que isAnimationActive cambia
    */
    useEffect(() => {
        const audioElement = audioElementRef.current;
       
        const fadeOutAudio = (audio, duration) => {
            
            const initialVolume = audio.volume;
            const fadeSteps = duration / 50; // Número de pasos de fade
            const fadeStep = initialVolume / fadeSteps; // Cambio de volumen por paso
            let currentVolume = initialVolume;
    
            const fadeInterval = setInterval(() => {
                if (currentVolume > fadeStep) {
                    currentVolume -= fadeStep;
                    audio.volume = currentVolume;
                } else {
                    audio.volume = 0;
                    clearInterval(fadeInterval);
                    audio.pause();
                    audio.currentTime = 0; // Reiniciar el audio al inicio
                }
            }, 50); // Intervalo de tiempo en milisegundos para cada paso de fade
    
            // Limpiar el intervalo en caso de que se necesite
            return () => clearInterval(fadeInterval);
        };
    
        if (isAnimationActive) {
            if (audioElement) {
                audioElement.volume = 0.01; // Establece el volumen inicial al máximo
                audioElement.play().catch((error) => {
                    console.error('Error playing the audio:', error);
                });
    
                // Iniciar el fade out 1 segundo antes de pausar el audio
                setTimeout(() => {
                    fadeOutAudio(audioElement, 1000); // 1000 ms para el fade out
                }, 8000); // Iniciar el fade out en el segundo 8
            }
        } else {
            // Pausar el audio si la animación no está activa
            if (audioElement && !audioElement.paused) {
                audioElement.pause();
                audioElement.currentTime = 0; // Reiniciar el audio al inicio
            }
        }
    
        // Limpiar el intervalo si el componente se desmonta
        return () => {
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        };
    }, [isAnimationActive]);
    
    useEffect(() => {
        const timeout = setTimeout(() => setShowText(true), 1000); // Mostrar el texto después de 1 segundo

        return () => clearTimeout(timeout);
    }, []);
    useEffect(() => {
        if (animationTyping) {
            // Cambiar el texto después de 5 segundos (5000 milisegundos)
       /*     setText("I'm Ivo, a full stack developer");
            setText2('from Buenos Aires.This is my');
            setText3(' website, a place  where I share ');
            setText4('my projects  let my imagination ');
            setText5('run wild and let people');
            setText6(' a know  things about me.');*/
             changeAudio(1);
         
            const timer = setTimeout(() => {
                setText('Here are my personal');
                setText2('interests for professional.');
                setText3('purposes you might be  ');
                setText4(' interested in my work or ');
                setText5(    <>
                    my projects let my <i className="betlejuicetextimportant">imagination</i>
                  </>);
                setText6('my skills. Thank you so much ✋');
   
                setAnimationTyping2(true);

             //   setText6('');
            }, 19000);

            // Limpiar el temporizador si el componente se desmonta o isAnimationActive cambia
            return () => clearTimeout(timer);
        }
        
    }, [animationTyping]);


    /*  const texts = [
         "Here are my personal interests. For professional purposes, you might be interested in my work or my skills. Thank you so much.",
         "I'm Ivo, a full stack developer from Buenos Aires. This is my website, a place where I share my projects, let my imagination run wild, and let people know things about me."
     ];*/
    const moveAt = (iconElement, pageX, pageY) => {
        iconElement.style.left = pageX - iconElement.offsetWidth / 2 + 'px';
        iconElement.style.top = pageY - iconElement.offsetHeight / 2 + 'px';
    };

    const handleMouseDown = (event) => {
        const iconElement = iconRef.current;
        iconElement.style.position = 'absolute';
        iconElement.style.zIndex = 1000;

        document.body.append(iconElement);

        const onMouseMove = (event) => {
            moveAt(iconElement, event.pageX, event.pageY);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            handleClick(); // Activar la animación al soltar el icono
            setIsDisintegrating(true); // Iniciar la animación de desintegración
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp, { once: true });

        moveAt(iconElement, event.pageX, event.pageY);
    };

    const handleTouchStart = (event) => {
      
        const touch = event.touches[0];
        handleMouseDown(touch);
        
    };

    const handleTouchMove = (event) => {
        const touch = event.touches[0];
        moveAt(iconRef.current, touch.pageX, touch.pageY);
    };

    const handleTouchEnd = () => {
        handleClick();
        setIsDisintegrating(true);
    };

    function changeAudio(x) {
        const audioElement = document.getElementById('typing');

        if (x === 0) {
            setAnimationTyping(true);
            const ButtonCodeElement = document.getElementById('code');
            if (audioElement) {
                
                audioElement.volume = 0.3;
                ButtonCodeElement.style.opacity = 0;
                audioElement.play().catch((error) => {
                    console.error('Error playing the audio:', error);
                });

                setTimeout(() => {
                    audioElement.pause();
                    audioElement.currentTime = 0; // Reset the audio to the beginning
                }, 22000); // 18000 milliseconds = 18 seconds
            }
          
        
            
        }else{
            audioElement.volume = 0;
        }
    }
    return (
        <div>

            <button id="html-button3" >
                <img src={world} onClick={() => closeWindow()} alt=""></img>
            </button>
            <audio id="storm" src="heavy-storm.mp3"  ref={audioElementRef} preload="auto" loop></audio>
            <div class="homePage">



                <div class="homePage__folders">
                    <div class="homePage__folders-work" onClick={() => navigate("/work") + FolderDecide("work")}   /*onClick ={ function() { setChange('cameron') }} */ >
                        <img src={folder} alt="folder" />
                        <button id="work"  >
                            <a href=" ">
                                Work
                            </a>
                        </button>
                    </div>
                    <div class="homePage__folders-skills" onClick={() => navigate("/skills") + FolderDecide("skills")} >
                        <img src={skills} alt="folder" />
                        <button id="skills" >
                            <a href="/#" >
                                Skills
                            </a>
                        </button>
                    </div>
                    <div class="homePage__folders-about" onClick={() => navigate("/") + FolderDecide("about") + openWindow()}  >
                        <img src={about} alt="folder" />
                        <button id="about"  >
                            <a href=" " >
                                About
                            </a>
                        </button>
                    </div>
                    <div class="homePage__folders-message" onClick={() => navigate("/contact") + FolderDecide("contact")}  >
                        <img src="https://win98icons.alexmeub.com/icons/png/envelope_closed-0.png" alt="folder" />
                        <button id="contact">
                            <a href="/contact" >
                                Contact
                            </a>
                        </button>
                    </div>




                </div>

                <div id="iconContainer" style={{width:"50px;", height:"50px;"}}>
                    <button id={isDisintegrating ? 'disintegrate' : 'iconButton'}    
        >
                        <img
                            src={win98}
                            alt="icono"
                            id="movingIcon"
                            ref={iconRef}
                            className={isDisintegrating ? 'disintegrate' : ''}
                            style={{ position: 'absolute', cursor: 'pointer' }}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        />
                    </button>
                </div>

                <div id="windowAbout" class="homePage__about" >
                    <div class="homePage__about-title">
                        <a href=" ">About
                        </a>
                        <img src={close} alt="" onClick={() => closeWindow()}></img>
                    </div>
                    <div class="homePage__content">

                        <div className={`homePage_content-binary ${isAnimationActive ? 'homePage_content-clickAnimation' : ''}`} />
                        <div class="image-binary-father">
                            <img class="image-binary" style={isAnimationActive?{animation:'afterAnimationImage 5s linear forwards',animationDelay:"19s"}:{}} alt="" />



                            <div class="homePage__content-title">

                                <h1
                                    id="content-title"
                                    style={isAnimationActive
                                        ? { animation: 'psychedelicClickName 5s linear infinite', boxShadow: '0px -120px 120px inset #ef43fffb' }
                                        : {}}>
                                    Ivo Ortiz
                                </h1>
                            </div>
                            <div class="homePage__content-description">
                                <h2 style={{marginTop:"35px"}}>Full Stack Developer Junior</h2>
                                {/*<div class="homepage__content-medium">
                          <div clasS="homePage__content-img">
                                <img src={avatarimage} alt="" />
                            </div>
                            </div>*/}
              
                                <div id="code">
                                    <button className="coding"  onClick={() => changeAudio(0)}>
                                    <div id="coding2" style={{ display: "inline-block"}}>
            Start
            <br></br>
            &lt;/&gt;
        </div>
        <br></br>
                             
                          

                                    </button>
                                    <audio id="typing" src="tyingslow.mp3" preload="auto" loop></audio>
                                </div>
                                <div>
                                    <div style={animationTyping ? { display: "inline-block" } : { display: "none" }}>
                                <ScrollViewComponent  
  content={              <div class="cart-about" style={{

    whiteSpace: 'nowrap',
    ...(isAnimationActiveText ? { animation: "afterAnimationImage 1s linear forwards" } : {})
}}>
  <div class="betlejuice-father" style={animationTyping2 ? { display: "none" } : { display: "inline-block" }}>

      <div class="betlejuice">

          <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 0s 1 normal both, blink 1s steps(1) infinite" }}>
              {"I'm Ivo, a full stack developer"}
              <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
                  animation: "escribir2 9s steps(30) forwards", // Animación rápida
                  animationDelay: "0s", // Retraso de inicio de 2 segundos
                  backgroundSize: "contain",
              } : {}}>  &#160;</span>
          </h1></div>
      <div class="betlejuice">
          <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 1.8s 1 normal both, blink 1s steps(1) infinite" }}>

              {"from Buenos Aires.This is my"}
              <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
                  animation: "escribir2 9s steps(30) forwards", // Animación rápida
                  animationDelay: "0s", // Retraso de inicio de 2 segundos
                  backgroundSize: "contain",
              } : {}}>  &#160;</span>
          </h1></div>
      <div class="betlejuice">
          <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 3.8s 1 normal both, blink 1s steps(1) infinite" }}>
              { " website, a place  where I share"}
              <span className={isAnimationActive ? "maquina-about-h1-span" :  {}} style={isAnimationActive ? {
                  animation: "escribir2 9s steps(30) forwards", // Animación rápida
                  animationDelay: "0s", // Retraso de inicio de 2 segundos
                  backgroundSize: "contain",
              } : {}}>  &#160;</span>
          </h1></div>
      <div class="betlejuice">
          <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 5.8s 1 normal both, blink 1s steps(1) infinite" }}>
              { " my projects  let my "} <i class="betlejuicetextimportant">imagination</i>
              <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
                  animation: "escribir2 9s steps(30) forwards", // Animación rápida
                  animationDelay: "0s", // Retraso de inicio de 2 segundos
                  backgroundSize: "contain",
              } : {}}>  &#160;</span>
          </h1></div>
      <div class="betlejuice">
          <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 7.8s 1 normal both, blink 1s steps(1) infinite" }}>
              {"run wild and let people"}
              <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
                  animation: "escribir2 9s steps(30) forwards", // Animación rápida
                  animationDelay: "0s", // Retraso de inicio de 2 segundos
                  backgroundSize: "contain",
              } : {}}>  &#160;</span>
          </h1></div>
      <div class="betlejuice">
          <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 9.8s 1 normal both, blink 1s steps(1) infinite" }}>
              {" a know  things about me."}
              <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
                  animation: "escribir2 9s steps(30) forwards", // Animación rápida
                  animationDelay: "0s", // Retraso de inicio de 2 segundos
                  backgroundSize: "contain",
              } : {}}>  &#160;</span>
          </h1></div>
   {/*  <div class="betlejuice">
          <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 4.5s steps(38) 19s 1 normal both, blink 1s steps(1) infinite" }}>
              {isAnimationActive ? text6 : "   "}
              <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
                  animation: "escribir2 9s steps(30) forwards", // Animación rápida
                  animationDelay: "0s", // Retraso de inicio de 2 segundos
                  backgroundSize: "contain",
              } : {}}>  &#160;</span>
          </h1></div>
          */}
      <br /> 
      </div>
      {/*SECOND TEXT*/}
      <div class="betlejuice-father" style={animationTyping2 ? { display: "inline-block" } : { display: "none" }}>

<div class="betlejuice">

    <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 0s 1 normal both, blink 1s steps(1) infinite" }}>
        { text}
        <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
            animation: "escribir2 9s steps(30) forwards", // Animación rápida
            animationDelay: "0s", // Retraso de inicio de 2 segundos
            backgroundSize: "contain",
        } : {}}>  &#160;</span>
    </h1></div>
<div class="betlejuice">
    <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 1.8s 1 normal both, blink 1s steps(1) infinite" }}>

        {text2}
        <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
            animation: "escribir2 9s steps(30) forwards", // Animación rápida
            animationDelay: "0s", // Retraso de inicio de 2 segundos
            backgroundSize: "contain",
        } : {}}>  &#160;</span>
    </h1></div>
<div class="betlejuice">
    <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 3.8s 1 normal both, blink 1s steps(1) infinite" }}>
        {text3 }
        <span className={isAnimationActive ? "maquina-about-h1-span" :  {}} style={isAnimationActive ? {
            animation: "escribir2 9s steps(30) forwards", // Animación rápida
            animationDelay: "0s", // Retraso de inicio de 2 segundos
            backgroundSize: "contain",
        } : {}}>  &#160;</span>
    </h1></div>
<div class="betlejuice">
    <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 5.8s 1 normal both, blink 1s steps(1) infinite" }}>
        { text4}
        <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
            animation: "escribir2 9s steps(30) forwards", // Animación rápida
            animationDelay: "0s", // Retraso de inicio de 2 segundos
            backgroundSize: "contain",
        } : {}}>  &#160;</span>
    </h1></div>
<div class="betlejuice">
    <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.6s steps(38) 7.8s 1 normal both, blink 1s steps(1) infinite" }}>
        {text5}
        <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
            animation: "escribir2 9s steps(30) forwards", // Animación rápida
            animationDelay: "0s", // Retraso de inicio de 2 segundos
            backgroundSize: "contain",
        } : {}}>  &#160;</span>
    </h1></div>
<div class="betlejuice">
    <h1 className={isAnimationActive ? "maquina-about-h1" : {}} style={{ animation: "typing 1.5s steps(38) 9.8s 1 normal both, blink 1s steps(1) infinite" }}>
        {text6 }
        <span className={isAnimationActive ? "maquina-about-h1-span" : {}} style={isAnimationActive ? {
            animation: "escribir2 9s steps(30) forwards", // Animación rápida
            animationDelay: "0s", // Retraso de inicio de 2 segundos
            backgroundSize: "contain",
        } : {}}>  &#160;</span>
    </h1></div>
    

  </div>
  </div>}
  style={{ position: 'relative', zIndex: 300 }}
/>                            
</div>
                      

                            </div>

                            

                        
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
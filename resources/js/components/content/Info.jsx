import React, { Component } from 'react'
import Figure from 'react-bootstrap/Figure'

import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from "react-i18next"

const Info = () => {
    const [t, i18n] = useTranslation("global");
    let url = useLocation().search
    const [searchParams] = useSearchParams();
    let cod = searchParams.get('acercade')
    let term = searchParams.get('terminos')
    return (
        <div>
            <div className='ini m-5 p-5'>
                <div className='align-self-start'>SISMED911</div>
                {/**{i18n.language == "es" ? :i18n.language == "en" ? :i18n.language == "fr" ?:i18n.language == "pt" ?:}**/}
                {term == 1 ? <div className='text-xxl-center p-3'><h1 className='text-xxl-center'>Términos y condiciones </h1>
                    Lea estos Términos y condiciones cuidadosamente antes de usar esta aplicación.
                    El acceso y uso de la aplicación está condicionado a  la aceptación y cumplimiento de estos términos, los que se aplican a quienes  acceden o utilizan los productos contenidos. La información proporcionada es entregada a manera de información  y está dirigida a personal de salud entrenado  y con conocimientos en respuesta a  emergencias de salud pública y desastres de cualquier origen. La información disponible no es para uso de la comunidad directamente y no reemplaza la experiencia  ni la capacitación del  profesional de la salud.
                    Este aplicativo no es un sustituto para el asesoramiento o capacitación profesional directa entre el profesional de salud-paciente.
                    Este aplicativo no genera  una relación asesor-cliente, ni pretende obtener información del usuario.
                </div> : cod == 1 ? <div className='text-xxl-center p-3'> <h1 className='text-xxl-center'>Acerca de</h1>

                    La OPS es el organismo internacional especializada en salud pública de las Américas y sirve como la oficina regional para las Américas de la Organización Mundial de la Salud (OMS). La OPS brinda cooperación técnica en salud a sus Estados Miembros, combate las enfermedades transmisibles y ataca los padecimientos crónicos y sus causas, fortalece los sistemas de salud, y da respuesta ante situaciones de emergencia y desastres.
                    La salud pública de la población de las Américas está constantemente afectada por múltiples amenazas. Desastres naturales como inundaciones, terremotos, huracanes y brotes ocurren en todo el continente. La OPS brinda apoyo a los Estados Miembros para mejorar la efectividad de la respuesta a desastres y las emergencias de salud cuando las capacidades nacionales se ven abrumadas para dirigir y coordinar la respuesta de salud, para brindar alivio y recuperación a las poblaciones afectadas.

                    Durante estas emergencias, los esfuerzos de las oficinas de la OPS en los países para responder están respaldados por el Centro de Operaciones de Emergencia (EOC) para gestionar la información, coordinar las operaciones, movilizar recursos, y responder rápidamente
                </div> : ''}


            </div>
        </div>
    )

}

export default Info;

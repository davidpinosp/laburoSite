import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/footerfiles.css";
function PrivacyPolicy() {
  return (
    <div
      className=" flx flx-col"
      style={{
        minHeight: "100vh",
      }}
    >
      <Navbar scrollPast={true} />

      <div className="skip-navbar-margin w100 flx flx-col flx-center mt-25">
        <div
          className="flx-col  w100"
          style={{
            minHeight: "100vh",
            alignItems: "center",
            maxWidth: "800px",
          }}
        >
          {" "}
          <div style={{ textAlign: "left", padding: "20px" }}>
            <h1 className="section-spacing">
              Política de privacidad de Laburo
            </h1>
            <p>
              Esta Política de privacidad describe cómo se recopila, utiliza y
              comparte su información personal cuando visita o hace una compra
              en quierolaburo.com (denominado en lo sucesivo el “Sitio”).
            </p>

            <h2 className="section-spacing">
              INFORMACIÓN PERSONAL QUE RECOPILAMOS
            </h2>
            <p>
              Cuando visita el Sitio, recopilamos automáticamente cierta
              información sobre su dispositivo, incluida información sobre su
              navegador web, dirección IP, zona horaria y algunas de las cookies
              que están instaladas en su dispositivo. Además, a medida que
              navega por el Sitio, recopilamos información sobre las páginas web
              individuales o los productos que ve, las páginas web o los
              términos de búsqueda que lo remitieron al Sitio e información
              sobre cómo interactúa usted con el Sitio. Nos referimos a esta
              información recopilada automáticamente como “Información del
              dispositivo”.
            </p>
            <p>
              Recopilamos Información del dispositivo mediante el uso de las
              siguientes tecnologías:
            </p>
            <ul className="custom-list section-spacing">
              <li className="">Archivos de registro</li>
              <li className="">Balizas web, etiquetas y píxeles</li>
              <li className="">COOKIES</li>
            </ul>

            <h2 className="section-spacing">
              ¿CÓMO UTILIZAMOS SU INFORMACIÓN PERSONAL?
            </h2>
            <p>
              Usamos la Información del pedido que recopilamos en general para
              preparar los pedidos realizados a través del Sitio (incluido el
              procesamiento de su información de pago, la organización de los
              envíos y la entrega de facturas y/o confirmaciones de pedido).
              Además, utilizamos esta Información del pedido para:
              <ul className="custom-list section-spacing">
                <li>Comunicarnos con usted.</li>
                <li>
                  Examinar nuestros pedidos en busca de fraudes o riesgos
                  potenciales.
                </li>
                <li>
                  Proporcionarle información o publicidad relacionada con
                  nuestros productos o servicios, según sus preferencias que
                  usted compartió con nosotros.
                </li>
              </ul>
            </p>
            <p>
              Usamos la Información del dispositivo que recopilamos para
              ayudarnos a detectar posibles riesgos y fraudes (en particular, su
              dirección IP) y, en general, para mejorar y optimizar nuestro
              Sitio (por ejemplo, al generar informes y estadísticas sobre cómo
              nuestros clientes navegan e interactúan con el Sitio y para
              evaluar el éxito de nuestras campañas publicitarias y de
              marketing).
            </p>

            <h2 className="section-spacing">
              COMPARTIR SU INFORMACIÓN PERSONAL
            </h2>
            <p>
              Compartimos su Información personal con terceros para que nos
              ayuden a utilizar su Información personal, tal como se describió
              anteriormente. Por ejemplo, utilizamos la tecnología de Shopify en
              nuestra tienda online. También utilizamos Google Analytics para
              ayudarnos a comprender cómo usan nuestros clientes el Sitio.
            </p>
            <p>
              Finalmente, también podemos compartir su Información personal para
              cumplir con las leyes y regulaciones aplicables, para responder a
              una citación, orden de registro u otra solicitud legal de
              información que recibamos, o para proteger nuestros derechos.
            </p>

            <h2 className="section-spacing">
              PUBLICIDAD ORIENTADA POR EL COMPORTAMIENTO
            </h2>
            <p>
              Como se describió anteriormente, utilizamos su Información
              personal para proporcionarle anuncios publicitarios dirigidos o
              comunicaciones de marketing que creemos que pueden ser de su
              interés. Puede darse de baja de la publicidad dirigida mediante
              los enlaces proporcionados.
            </p>

            <h2 className="section-spacing">NO RASTREAR</h2>
            <p>
              Tenga en cuenta que no alteramos las prácticas de recopilación y
              uso de datos de nuestro Sitio cuando vemos una señal de No
              rastrear desde su navegador.
            </p>

            <h2 className="section-spacing">SUS DERECHOS</h2>
            <p>
              Si usted es un residente europeo, tiene derecho a acceder a la
              información personal que tenemos sobre usted y a solicitar que su
              información personal sea corregida, actualizada o eliminada. Si
              desea ejercer este derecho, comuníquese con nosotros a través de
              la información de contacto que se encuentra a continuación.
            </p>

            <h2 className="section-spacing">RETENCIÓN DE DATOS</h2>
            <p>
              Cuando realiza un pedido a través del Sitio, mantendremos su
              Información del pedido para nuestros registros a menos que y hasta
              que nos pida que eliminemos esta información.
            </p>

            <h2 className="section-spacing">CAMBIOS</h2>
            <p>
              Podemos actualizar esta política de privacidad periódicamente para
              reflejar, por ejemplo, cambios en nuestras prácticas o por otros
              motivos operativos, legales o reglamentarios.
            </p>

            <h2 className="section-spacing">CONTÁCTENOS</h2>
            <p>
              Para obtener más información sobre nuestras prácticas de
              privacidad, si tiene alguna pregunta o si desea presentar una
              queja, contáctenos por correo electrónico a
              support@quierolaburo.com.
            </p>
          </div>
        </div>
      </div>
      <Footer type={2} />
    </div>
  );
}

export default PrivacyPolicy;

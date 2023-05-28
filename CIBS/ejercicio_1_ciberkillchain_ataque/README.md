# Ejercicio CiberKillChain - Ataque

Hacer una copia de este documento para utilizar com plantilla para el ejercicio quitando las instrucciones y el ejemplo.

## Alumno

Nahuel Severini

## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para un escenario relacionado al trabajo práctico de la carrera.

## Datos trabajo práctico

[Planificación del trabajo](https://github.com/nseverini/plantilla-planificacion/blob/aerogrow/charter.pdf)

[Memoria del trabajo (en proceso)](https://github.com/nseverini/Plantilla-memoria)

El propósito del trabajo es el diseño, desarrollo e implementación de un sistema que permita la gestión de cultivos aeropónicos, con el objetivo de incrementar su productividad y reducir la dificultad de mantenimiento.

Diagrama en bloques del sistema

<img width="592" alt="Diagrama en bloques" src="https://github.com/nseverini/ceiot_base/assets/46693419/d4654fbf-29f5-459d-b7fa-046d13bfbf90">

Se utiliza un ESP32 como microcontrolador por cada zona de cultivo aeropónica que tiene una conexión MQTT con el broker Aedes para recibir datos provenientes de este y a su vez transmitir la información recibida de los sensores.

El broker se encarga de autenticar y autorizar al microcontrolador. Una vez hecho esto, debe analizar la información recibida, validarla y en caso de ser necesario enviarla al DaaS de MongoDB para que sea almacenada. Además, el broker por medio del protocolo WebSocket puede envíar los datos en tiempo real a la aplicación PWA.

La API REST gestiona el acceso a los datos almacenados en el DaaS, brindando permisos de lectura y escritura cuando sea necesario, por medio de sus endpoints. Estos últimos son consumidos por la aplicación PWA por medio de HTTPS.

Por ultimo, la aplicación PWA permite al usuario interactuar con el sistema por medio de sus interfaces.

A diferencia del microcontrolador que es único por zona de cultivo, el servidor y el DaaS es compartido entre todos los usuarios que posea el sistema.

Es importante destacar que todas las conexiones realizadas entre los componentes del sistema utilizan TLS, para asegurar que las mismas sean seguras.

## Resolución

### Objetivo del ataque
Lograr que el usuario final no tenga confianza en el sistema para que comience a usar el software de la competencia, para lograrlo se implementará una estrategia que involucra la intercepción de las mediciones y el envío de datos inválidos.

### Pasos del ataque

### 1. Reconnaissance.
Técnicas utilizadas: Gather Victim Host Information [T1592](https://attack.mitre.org/techniques/T1592/) y Gather Victim Org Information [T1591](https://attack.mitre.org/techniques/T1591/)
- Se realizá un análisis de la documentación del sistema. 
- Se descubre que la empresa utiliza un servicio de recolección de hardware sensible.
- Se realizá un análisis del personal que trabaja en el servicio de recolección.

### 2. Weaponization.
Técnicas utilizadas: Develop Capabilities [T1587](https://attack.mitre.org/techniques/T1587/) y Acquire Infrastructure [T1583](https://attack.mitre.org/techniques/T1583/)
- Se consiguen credenciales falsas para hacerme pasar por un recolector de hardware sensible.
- Se diseña e implementa un software que sea capaz de interceptar los mensajes de los microcontroladores, para poder modificarlos y enviarlos al broker real. 
- Se diseña e implementa una web que clone las páginas públicas del sistema y que sea capaz de guardar las credenciales ingresadas del usuario.

### 3. Delivery.
Técnicas utilizadas: Phishing [T1566](https://attack.mitre.org/techniques/T1566/) y Account Discovery [T1087](https://attack.mitre.org/techniques/T1087/)
- Se envían correos electrónicos maliciosos a los usuarios del sistema. Los correos electrónicos solicitarán el ingreso de sus credenciales en la web falsa creada previamente. 
- Se utilizan las credenciales falsas para hacerse pasar por el empleado de recolección.

### 4. Exploit.
Técnicas utilizadas: Obtain Capabilities [T1588](https://attack.mitre.org/techniques/T1588/) 
- Se logra obtener el hardware de la empresa que contiene un backup con los certificados TLS.
- Se logra obtener las credenciales de los usuarios para poder ingresar al sistema y obtener las credenciales de los microcontroladores.

### 5. Installation.
Técnicas utilizadas:
- Al poseer los certificados TLS y las credenciales de los microcontroladores, el software creado previamente logra interceptar los mensajes de los microcontroladores y los reenvia sin alterarlos al broker para poder evaluar el resultado.

### 6. Command & Control.
Técnicas utilizadas: Proxy [T1090](https://attack.mitre.org/techniques/T1090/)
- 

### 7. Actions on Objectives.
Técnicas utilizadas: Data Manipulation [T1565](https://attack.mitre.org/techniques/T1565/)
- Se interceptan los mensajes enviados por los microcontroladores de los usuarios, se ingresan datos erróneos y se reenvían al broker real.




  


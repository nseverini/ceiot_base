# Ejercicio CiberKillChain - Defensa

## Alumno

Nahuel Severini

## Enunciado

Desarrollar la defensa en función del ataque planteado en orden inverso.

Para cada etapa elegir una sola defensa, la más importante, considerar recursos limitados.

## Resolución

### Ataque realizado

Se logró que el usuario desconfie del sistema y que comience a usar el software de la competencia ya que los datos que ve reflejado en el primero son notoriamente inválidos.

### Pasos de la defensa

### 7. Actions on Objectives.
Técnicas utilizadas: Phishing [T1566](https://attack.mitre.org/techniques/T1566/) y Account Discovery [T1087](https://attack.mitre.org/techniques/T1087/)

Al recibir múltiples reclamos de clientes acerca de los datos reportados por el sistema, se decide hacer una inspección física de las zonas de cultivo de los usuarios utilizando sensores homologados para comparar los valores reportados.  

Al asegurarse que los sensores de la zona de cultivo reportan valores inválidos se procede a remover los mismos para hacer un análisis individual de cada uno de ellos en un ambiente clonado. A partir de este análisis, se descubre que funcionan correctamente y que por lo tanto algo esta mal en el envió o recepción de los datos en el broker: para comprobarlo se decide clonar el broker en el mismo ambiente clonado y simular el envió de mediciones mediante el microcontrolador y sensores que fueron previamente analizados.

Se llega a la conclusión que tanto el broker como el microcontrolador y sensores funcionan correctamente, lo cual deja una única opción viable: algo esta afectando el servidor de la empresa y no permite que lleguen los datos reales. Luego de hacer pruebas en todo el sistema, se logra aislar el problema al broker, ya que los endpoints y demas partes del sistema pueden recibir datos de manera normal.

A partir de este punto no quedan dudas, el sistema esta siendo victima de un ataque externo por una vulnerabilidad desconocida.

### 6. Command & Control. 
Técnicas utilizadas: Phishing [T1566](https://attack.mitre.org/techniques/T1566/) y Account Discovery [T1087](https://attack.mitre.org/techniques/T1087/)


### 5. Installation.
Técnicas utilizadas: Phishing [T1566](https://attack.mitre.org/techniques/T1566/) y Account Discovery [T1087](https://attack.mitre.org/techniques/T1087/)


### 4. Exploit.
Técnicas utilizadas: Phishing [T1566](https://attack.mitre.org/techniques/T1566/) y Account Discovery [T1087](https://attack.mitre.org/techniques/T1087/)

### 3. Delivery.
Técnicas utilizadas: User Training [M1017](https://attack.mitre.org/mitigations/M1017/) y Software Configuration [M1054](https://attack.mitre.org/mitigations/M1054/)

Para evitar que los empleados de la empresa vuelvan a caer bajo correos maliciosos se deciden realizar las siguientes acciones:
- Realizar un curso con un experto en ciberseguridad que enseñe a los empleados a identificar este tipo de correos.
- Configurar los emails corporativos para que comprueben la validez del dominio del remitente y la integridad de los mensajes para realizar un filtrado en caso de ser necesario. 
- Instaurar una politica de reinicio de contraseña cada un periodo corto de tiempo para los emails y cuentas corporativas.

### 2. Weaponization.
Técnicas utilizadas: Pre-compromise [M1056](https://attack.mitre.org/mitigations/M1056/) y https://attack.mitre.org/datasources/DS0035/

### 1. Reconnaissance.
Técnicas utilizadas: Internet Scan [DS0035](https://attack.mitre.org/datasources/DS0035/)

Para evitar futuros ataques se decide:
- Realizar un analisis de la información pública de la empresa.
- Eliminar toda la información pública que pueda ser utilizada dañinamente. Toda información encontrada que se pu

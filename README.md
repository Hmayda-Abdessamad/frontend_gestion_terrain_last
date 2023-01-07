# Gestion-des-terrain_web
1- Gestion Des Terrains : est une application qui peut etre utilisé dans le web et  egalement dans le mobile , cette application  permet la gestion des terrains :CRUD ,de telle facon que les terrain appartien  une zone , la quelle appartient également à une seule ville, d'autre part une ville peut avoir plusiurs zones et plusieurs terrains peuvent etre à la fois dans la meme zone . Egalement on a les clubs qui peuvent avoir plusiers  terrain et en contre partie un terrain appartient à un seul ckub

concernant nos acteurs , notre application est dédié à un administrateur qui peut gerer ces processus métiers et un clinet qui aura la posibilité de réserver un terrain et meme benefier des promotions graces aux pack offerts par l'administraur .


                      
 cette repo est dédié à la partie web de ce projet , dans cette partie on a choisi react pour le frontend et spring boot pour le backend , ces deux xommuniquent grace  à axios ou temps en temps on a utilisé l 'api fetch        
 
 

2- Getting Started :

        -Prerequisites :
        
            Node.js
            ReactJS
            Android Studio
            
        -Installing
        
            1-Clone the repository :
            
            git clone https://github.com/Hmayda-Abdessamad/frontend_gestion_terrain_last
            
            2-Install the dependencies:
            npm install
            
            3-Run the app :
            npm start
            
 3- The architecture of our App :
      
        -React frontend: This will be the client-side of our web application. It will communicate with the backend 
          using APIs to retrieve and update data.
        
        -Spring Boot backend: This will be the server-side of our web application. It will handle requests from
          the frontend, query a database to retrieve or update data, and return responses to the frontend.
        
        -Database: We are using  MySQL, The Spring Boot backend will connect to the database to retrieve and update data.
        
        -Mobile app: The mobile app will be a separate client that communicates with the backend using APIs.
          It will use the MVVM architecture, with the View representing the user interface, 
          the ViewModel handling the business logic, and the Model representing the data.
          
          
![maxresdefault](https://user-images.githubusercontent.com/101585977/211149816-fbb5c4ff-8ed3-4f77-a678-edc13b525a14.jpg)
![156711399-b38e9f5c-10f9-49fe-b979-75cd5cb78989](https://user-images.githubusercontent.com/101585977/211149822-736f9621-6fcb-4c48-980a-e643c2c7c9af.png)

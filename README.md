# Gestion-des-terrain_web
1- Gestion Des Terrains : est une application coté web et mobile, qui permet la gestion des terrains, création des terrains et les catégoriser par villes et zones.
                       Ainsi qu'elle permet la reservation des terrains et la gestion de ces réservation.
                       Les terrains seront affiché dans une map avec la possibilité d'afficher la distance entre le client et le plus proche terrain ainsi que l'itinéraire.

2- Getting Started :

        -Prerequisites :
        
            Node.js
            ReactJS
            Android Studio
            
        -Installing
        
            1-Clone the repository :
            
            git clone https://github.com/Hmayda-Abdessamad/Terrain.git
            
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

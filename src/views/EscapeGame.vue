<template>
    <div>
        <h1>Escape Game</h1>
        <button @click="jobUpdateStatus(jobStatus.Closed_Lost)" >Run Script</button>
        <div class="scriptOutputContainer">
            <p v-if="loading">Loading...</p>
            <p v-if="error">Error:: {{ error }}</p>
            <span v-if="gamemasters">
                <h2>Gamemasters:</h2>
                <ul>
                    <li v-for="gamemaster in gamemasters" :key="gamemaster.id">
                        <div>
                            (Id:{{ gamemaster.id }}) - {{ gamemaster.name }}  <br>
                            Trained rooms ({{ gamemaster.trained_rooms.length }}): {{ gamemaster.trained_rooms }}
                        </div>
                    </li>
                </ul>
            </span>
            <span v-else>
                No gamemasters were returned
            </span>

            <span v-if="rooms">
                <h2>Rooms</h2>
                <ul>
                    <li v-for="room in rooms" :key="room.id">
                        <div>
                            (Id:{{ room.id }}) - {{ room.name }} <br>
                            Trained gamemasters: <br>

                            {{ room }}
                        </div>
                    </li>
                </ul>
            </span>
            <span v-else>
                No rooms were returned
            </span>

            <span v-if="sessions">
                <h2>Sessions</h2>
                <ul>
                    <li v-for="session in sessions" :key="session.id">
                        <div>
                            {{ session }}
                        </div>
                    </li>
                </ul>
            </span>
            <span v-else>
                No sessions were returned
            </span>
        </div>
  </div>
</template>
  
<script>
//import  ProductComponent  from './components/ProductComponent.vue';
//import axios from "axios";

export default {
    name: "JobManagerDashboard", // useful for debugging purposes
    components: {
        // declared child components
        // Components that can be used in the template
        //ProductComponent,
    },
    props: {
		// The parameters the component accepts
		// properties passed from parent
		
		//message: String,
		//product: Object,
		
		//email: {
		//  type: String,
		//  required: true,
		//  default: "none"
		  //validator: function (value) {
			// Should return true if value is valid
		  //}
		//}
	},
	emits: [ // events emitted by this component
	
	],
    // Component Lifecycle Hooks
	setup() {
        // Code within setup() runs before beforeCreate hook
		//console.log('Code inside setup()');
        // Other lifecycle hooks like created(), mounted(), etc. can follow
        },
    data() {  
        // component internal state variables
        return {
            //firstName: 'Vue',
            apiUrl:"http://192.168.1.99:8000/jobs",
            applicationStats: null,
            loading: false,
            error: null,
            gamemasters: [],
            sessions: [],
            rooms: []
        } 
    }, 
    computed: {
        // computed properties
        // Return cached values until dependencies change
        //fullName: function () {
            //  return this.firstName + ' ' + this.lastName
            //}
            },
    watch: {
        // observed properties
        // Called when firstName changes value
        //firstName: function (value, oldValue) {  }
    },
	beforeCreate() {
        console.log("EscapeGame - beforeCreate");
        },
	created() {
        console.log("EscapeGame - created");
    },
	beforeMount() {
        console.log("EscapeGame - beforeMount");
    },
	mounted() {
        console.log("EscapeGame - mounted");
        //console.log("fetching jobs from the jobs API...");
        //this.fetchStats()
        this.runScript()
    },
	beforeUpdate() {
        console.log("EscapeGame - beforeUpdate");
    },
	updated() {
        console.log("EscapeGame - updated");
    },
	activated() {
        console.log("EscapeGame - activated");
    },
	deactivated() {
        console.log("EscapeGame - deactivated");
    },
	
	
    beforeUnmount() {
        console.log("EscapeGame - beforeUnmount");
    }, // beforeDestroy with Vue 2
	unmounted() {
        console.log("EscapeGame - unmounted");
    }, // destroyed with Vue 2
    errorCaptured() {},

	methods:{  // component own methods
		//setFirstName() {  
		//  this.firstName='Joe'  
		//}
        async runScript() {
            this.loading = true;
            this.error = null;
            try {
                const GAMEMASTERS = [
                    { id: 1, name: 'John', trained_rooms: [2, 3] },
                    { id: 2, name: 'Alice', trained_rooms: [4, 10] },
                    { id: 3, name: 'David', trained_rooms: [5] },
                    { id: 4, name: 'Emily', trained_rooms: [8, 6, 2, 7] },
                    { id: 5, name: 'Michael', trained_rooms: [9, 1, 4, 3, 11, 8, 6, 12] },
                    { id: 6, name: 'Sophia', trained_rooms: [7, 10] },
                    { id: 7, name: 'Daniel', trained_rooms: [8] },
                    { id: 8, name: 'Olivia', trained_rooms: [3, 9] },
                    { id: 9, name: 'Matthew', trained_rooms: [2, 6, 1, 7, 3, 4] },
                    { id: 10, name: 'Emma', trained_rooms: [5, 4] },
                    { id: 11, name: 'James', trained_rooms: [11] },
                    { id: 12, name: 'Isabella', trained_rooms: [7, 4, 12] },
                    { id: 13, name: 'William', trained_rooms: [11] },
                    { id: 14, name: 'Ava', trained_rooms: [9] },
                    { id: 15, name: 'Benjamin', trained_rooms: [8, 4] },
                    { id: 16, name: 'Mia', trained_rooms: [1, 3, 7, 5, 8] },
                    { id: 17, name: 'Ethan', trained_rooms: [4, 2] },
                    { id: 18, name: 'Charlotte', trained_rooms: [10] },
                    { id: 19, name: 'Alexandre', trained_rooms: [9, 2, 8] },
                    { id: 20, name: 'Harper', trained_rooms: [1, 12] }
                ]

                const ROOMS = [
                    { id: 1, name: "Le Braquage à la francaise" },
                    { id: 2, name: "Le Braquage de casino" },
                    { id: 3, name: "L'Enlèvement" },
                    { id: 4, name: "Le Métro" },
                    { id: 5, name: "Les Catacombes" },
                    { id: 6, name: "Assassin's Creed" },
                    { id: 7, name: "L'Avion" },
                    { id: 8, name: "La Mission spatiale" },
                    { id: 9, name: "Le Tremblement de terre" },
                    { id: 10, name: "Le Cinéma hanté" },
                    { id: 11, name: "Le Farwest" },
                    { id: 12, name: "Mission secrète" }
                ]

                // Tirage aléatoire des gamemasters
                const random_gamemaster_array = size => GAMEMASTERS.sort(() => Math.random() - 0.5).slice(0, size)

                let gamemasters = random_gamemaster_array(ROOMS.length)
                const sessions = ROOMS.map(room => {return {room: room}})
                let rooms = ROOMS.slice()
                
                gamemasters = gamemasters.sort((gmA, gmB) => gmA["trained_rooms"].length - gmB["trained_rooms"].length)
                
                gamemasters.forEach((gm) => {
                    gm["trained_rooms"].forEach((room) => {
                        if(!("trained_gamemasters" in rooms[room -1])){
                            rooms[room - 1]["trained_gamemasters"] = [gm]
                        } else {
                            rooms[room - 1]["trained_gamemasters"].push(gm)
                        }
                    })
                })

                this.gamemasters = gamemasters
                this.sessions = sessions
                this.rooms = rooms
                
                /* TODO
                Tu vas devoir attribuer à chaque session un gamemaster en fonction des salles sur lesquelles il est déjà formé.
                Chaque gamemaster ne peut être attribué qu'à une seule session.
                Tu as quartier libre sur la methode, l'objectif ici est de voir comment tu travailles et comment tu te confrontes à ce genre de problème.
                Si le tirage est impossible, tu devras signaler le problème. Sinon tu devras afficher une des solutions.

                /!\ L'annonce stipule que nous cherchons un développeur senior.
                */
            } catch (err) {
                this.error = 'Failed to run script';
            } finally {
                this.loading = false;
            }
        },
	},
};
</script>

<style>

</style>
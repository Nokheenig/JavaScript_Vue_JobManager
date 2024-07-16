<template>
    <div>
        <h1>Application Stats</h1>
        <div class="jobsContainer">
            <p v-if="loading">Loading...</p>
            <p v-if="error">Error:: {{ error }}</p>
            <span v-if="applicationStats">
                {{ applicationStats }}
            </span>
            <span v-else>
                No stats were returned
            </span>
            </div>
  </div>
</template>
  
<script>
//import  ProductComponent  from './components/ProductComponent.vue';
import axios from "axios";

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
        console.log("JobManagerDashboard - beforeCreate");
        },
	created() {
        console.log("JobManagerDashboard - created");
    },
	beforeMount() {
        console.log("JobManagerDashboard - beforeMount");
    },
	mounted() {
        console.log("JobManagerDashboard - mounted");
        console.log("fetching jobs from the jobs API...");
        this.fetchStats()
    },
	beforeUpdate() {
        console.log("JobManagerDashboard - beforeUpdate");
    },
	updated() {
        console.log("JobManagerDashboard - updated");
    },
	activated() {
        console.log("JobManagerDashboard - activated");
    },
	deactivated() {
        console.log("JobManagerDashboard - deactivated");
    },
	
	
    beforeUnmount() {
        console.log("JobManagerDashboard - beforeUnmount");
    }, // beforeDestroy with Vue 2
	unmounted() {
        console.log("JobManagerDashboard - unmounted");
    }, // destroyed with Vue 2
    errorCaptured() {},

	methods:{  // component own methods
		//setFirstName() {  
		//  this.firstName='Joe'  
		//}
        async fetchStats() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios({
                    url:`${this.apiUrl}/stats/applications-count`,
                    method: 'GET',
                    params:{
                    },
                    //data: this.displayJobsStatus,
                });
                let data = response.data;
                if (data){
                    this.applicationStats = data
                }
                
            } catch (err) {
                this.error = 'Failed to fetch data';
            } finally {
                this.loading = false;
            }
        },
	},
};
</script>

<style>
.jobStatusCheckboxContainer{
    height: fit-content;
    width: 15em;
    background-color: aquamarine;
    display: flex;
    flex-direction: column;
    align-items: start;
}
.dashboardContainer{
    height: fit-content;
    width: max-content;
    background-color: blanchedalmond;
    display: flex;
    flex-direction: row;
}
.jobStatusCheckboxButtons{
    display: flex;
    flex-direction: row;

}
.jobStatusCheckboxButton{
    background-color: grey;
    text-decoration-color: aqua;
    margin: 0.5em;
    cursor:pointer
}

.jobPostCardActions{
    display: flex;
    flex-direction: row;
}
.jobPostCardActions > * {
    margin-right: 1em;
}
.jobPostCardActions > *:first-child {
    margin-right: 1em;
    margin-left: 1em;
}
</style>
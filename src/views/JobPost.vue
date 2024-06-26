<template>
    <div>
        <p v-if="loading">Loading...</p>
        <p v-if="error">Error:: {{ error }}</p>
        <div v-if="jobData">
            {{jobData.scrapStatus}} - <h1>{{jobData.title}}</h1>
            {{jobData.company}}
            <br> {{ jobData.country }}/{{ jobData.city }}
            <br> #{{ jobData.tags }} 
            <br> ({{ jobData.contractType }})
            <br> Url: <a :href="jobData.url">{{ jobData.url }}</a>
            
            <br> Apply Url: <a :href="jobData.applyUrl">{{ jobData.applyUrl }}</a>
            <br> Created at: {{ jobData.createdAt }}
            <span v-if="jobData.applicationDate"><br> Applied on: {{ jobData.applicationDate }}</span>
            <br><button @click="jobApplied" >Applied</button>
            <div>
                {{ jobData.description }}
            </div>
        </div>

  </div>
</template>
  
<script>
//import  ProductComponent  from './components/ProductComponent.vue';
import axios from "axios";

export default {
    name: "JobPost", // useful for debugging purposes
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
            jobData: null,
            loading: false,
            error: null
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
        console.log("fetching job's data from the jobs API...");
        this.fetchJobData()
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
        async fetchJobData() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`${this.apiUrl}/${this.$route.params.jobId}`,{
                    params:{ }
                });
                let data = response.data;
                if (data){
                    this.jobData = data
                }
                
            } catch (err) {
                this.error = 'Failed to fetch data';
            } finally {
                this.loading = false;
            }
        },
        
        formatDescription(jobDescription) {
            
        },

        async jobApplied() {
            console.log("jobApplied - Start")
            let m = new Date();
            let dateString =
                m.getUTCFullYear() + "-" +
                ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
                ("0" + m.getUTCDate()).slice(-2) + "T" +
                ("0" + m.getUTCHours()).slice(-2) + ":" +
                ("0" + m.getUTCMinutes()).slice(-2) + ":" +
                ("0" + m.getUTCSeconds()).slice(-2);

            console.log(dateString);
            let payload = {
                "applicationDate":dateString
            }
            console.log("updating the database object...")
            try {
                const response = await axios({
                    url:`${this.apiUrl}/${this.$route.params.jobId}`,
                    method: 'PATCH',
                    data: payload,
                    
                    //{   Host: "http://192.168.1.99:3000",
                    //    Origin: "http://192.168.1.99:3000", }
                        //{//"Content-Type": 'application/x-www-form-urlencoded'}
                });
                //let data = response.data;
                console.log("pouet")
                console.log(response)
                if (response.status == 200){
                    //this.jobData = data
                }
                
            } catch (err) {
                this.error = 'Failed to fetch data';
            } finally {
                this.loading = false;
            }

        }
	},

};
</script>

<style>

</style>
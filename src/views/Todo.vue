<template>
  <div class="home">
    <v-text-field
    class="pa-2"
            v-model="newTaskTitle"
            @click:append="addtask"
            @keyup.enter="addtask"
            outlined
            label="Append"
            append-icon="mdi-plus"
          ></v-text-field>
    <v-list
    class="pt-0"
      flat
    >
      <div
      v-for="task in tasks"
        :key="task._id">
        <v-list-item 
        @click="doneTask(task._id)"
        :class="{'blue lighten-5':task.isDone}"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                :input-value="task.isDone"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="{'text-decoration-line-through':task.isDone}">{{ task.description}}</v-list-item-title>
              
            </v-list-item-content>
          <v-list-item-action>
            <v-btn icon
              @click.stop="deleteTask(task._id)" >
              <v-icon color="primary lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>

import service from "../service/service";
export default {
  name: 'Home',
  data(){
    return {
      newTaskTitle:'',
      tasks: []
    }
  },
  methods:{
    doneTask(id){
      
      let task = this.tasks.filter(task=>task._id ===id)[0]
      task.isDone = !task.isDone;
      
      service.update(id, task).then((res) => {
        console.log("data nya  ="+JSON.stringify(res.data))
        task = res.data
      })
    },
    deleteTask(id){  
      service.delete(id).then((res) => {
        this.tasks = this.tasks.filter(task=> task._id !==id)
      })
      
    },
    addtask(){
      // console.log("add task 1")
      let newTask = {
        // id:Date.now(),
        description: this.newTaskTitle,
        isDone:false
      }
      service.create(newTask).then((res) => {
        this.tasks.push(res.data)
        this.newTaskTitle =''
      }) 
    },
    getList(){
      service.getList().then((res)=>
        {
          if(res.data.length>0){
            this.tasks =res.data
          }
        }
      )

    }
  },
  mounted(){
    this.getList()
  }
}
</script>



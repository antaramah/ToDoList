import React from 'react';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        todoList:[],
        activeItem:{
          id:null, 
          title:'',
          label:'',
          completed:false,
        },
        editing:false,
      }

    
      this.fetchTasks = this.fetchTasks.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleDropChange = this.handleDropChange.bind(this)
      this.handleChange2 = this.handleChange2.bind(this)
      this.handleSelect = this.handleSelect.bind(this)
      this.fetchActive = this.fetchActive.bind(this)
      this.fetchInactive = this.fetchInactive.bind(this)
      this.getCookie = this.getCookie.bind(this)


      this.startEdit = this.startEdit.bind(this)
      this.deleteItem = this.deleteItem.bind(this)
      this.strikeUnstrike = this.strikeUnstrike.bind(this)
  };


  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
   // console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/task-list/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        todoList:data
      })
      )
  }
  fetchActive(){

   fetch('http://127.0.0.1:8000/api/task/Active/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        todoList:data
      })
      )
  }

  fetchInactive(){

    fetch('http://127.0.0.1:8000/api/task/Inactive/')
     .then(response => response.json())
     .then(data => 
       this.setState({
         todoList:data
       })
       )
   }

  

  handleChange(e){
    var name = e.target.name
    var value = e.target.value
  

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }

  handleChange2(e){
    var name = e.target.name
    var value = e.target.value
    
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        label:value
      }
    })
  }

 
  handleSubmit(e){
    // e.preventDefault()
    //console.log('ITEM:', this.state.activeItem)

    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/api/task-create/'

    if(this.state.editing === true){
      url = `http://127.0.0.1:8000/api/task-update/${ this.state.activeItem.id}/`
      this.setState({
        editing:false
      })
    }



    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((response)  => {
        this.fetchTasks()
        this.setState({
           activeItem:{
          id:null, 
          title:'',
          label:'',
          completed:false,
        }
        })
    }).catch(function(error){
      //console.log('ERROR:', error)
    })

  }

  startEdit(task){
    this.setState({
      activeItem:task,
      editing:true,
    })
  }


  deleteItem(task){
    var csrftoken = this.getCookie('csrftoken')

    fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method:'DELETE',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
    }).then((response) =>{

      this.fetchTasks()
    })
  }

  handleSelect(e){
    var name = e.target.name
    var value = e.target.value
   

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        label:value
      }
    })
  }


  strikeUnstrike(task){

    task.completed = !task.completed
    var csrftoken = this.getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`

      fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'completed': task.completed, 'title':task.title})
      }).then(() => {
        this.fetchTasks()
      })

    console.log('TASK:', task.completed)
  }

  Dropdown(props) {
    return <>
        <select {...props}>
            {props.options &&
                props.options.map(o =>
                    <option key={o.key} value={o.key}>
                      {o.text}</option>)
            }
        </select>
    </>;
}

onDropdownSelected(e) {
  // console.log("THE VAL", e.target.value);
  //here you will see the current selected value of the select input
}

createSelectItems(z) {
   console.log("List::");
   const products = ['Perosnal','Private','Work','Family']
   const list = products.map(product => <li key={product}>{product}</li>)
  //  const e =['IMPORTANT','VERY IMP','PERSONAL']
  // const list = e.map(product => <li key={product.label}>{product.label}</li>)

 

  console.log("List::",list);
//   var rows = [];
//   ObjectRow
//   for (var i = 0; i < len; i++) {
//       // note: we are adding a key prop here to allow react to uniquely identify each
//       // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
//       rows.push(<ObjectRow key={i} />);
//   }
  
//   // e.map((label) =>
//   // items.push(<option key={e.label} value={e.label}>{e.label}</option>);
//   // );

//   // const label = e.label;  
//   // const labelList = label.map((labelName)=>  
//   //   <option key={labelName()}                                   
//   //             value={labelName}></option>  
//   // ); 

// //   var tifOptions = Object.keys(e).map(function(key) {
// //      <option value={e[key].label}>{e[key].label}</option>
// // });




//   // console.log("tifOptions::",tifOptions); 
//   // for (let i = 0 ;i<len;i++) {             
//   //      items.push(<option key={i} value={i}>{i}</option>);  
//   //     // items.push(<option key={e.label} value={e.label}>{e.label}</option>); 
//   //      //here I will be creating my options dynamically based on
//   //      //what props are currently passed to the parent component
//   // }

 return list;
} 

handleDropChange(event) {
  let obj = JSON.parse(event.target.value); //object
}

  render(){
    var tasks = this.state.todoList
    var self = this
    return(
        <div className="container">
         
          <div id="task-container">
          <h1>TodoMatic</h1>
              <div  id="form-wrapper">
                 <form onSubmit={this.handleSubmit}  id="form">
                    <div className="flex-wrapper">
                        <div >
                            <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder="What needs to be done?" required/>
                         </div>
                       
                         <div   style={{flex: 6}} className="flex">
                          <form className="flex-column">
                         
                               <select class="form-control" value={this.state.value} onChange={this.handleChange2}>
                              <option selected value="">Pick a Category</option>
                              <option value="Important">Important</option>
                              <option value="Personal">Personal</option>
                              <option value="Work">Work</option>                             
                              <option value="Finance">Finance</option>
                              </select>
                        
                          </form></div>
                
                         <div style={{flex: 1}}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                          </div>
                      </div>
                      </form>
                      <br></br>
                      <div style={{flex: 6}} className="filters btn-group stack-exception">
                      <button  type="button" className="btn btn-outline-secondary" aria-pressed="true">
                        <span className="visually-hidden">Show </span>
                        <span>all</span>
                        <span className="visually-hidden"> tasks</span>
                      </button>
                     <button type="button" onClick={self.fetchActive} className="btn btn-outline-warning" aria-pressed="false">
                        <span className="visually-hidden">Show </span>
                        <span>Active</span>
                        <span className="visually-hidden"> tasks</span>
                      </button>
                      <button type="button" className="btn btn-outline-success" aria-pressed="false">
                        <span className="visually-hidden">Show </span>
                        <span>Completed</span>
                        <span className="visually-hidden"> tasks</span>
                      </button>
                    </div>                        

                
             
              </div>

              <div  id="list-wrapper">         
                    {tasks.map(function(task, index){
                      return(
                          <div key={index} className="task-wrapper flex-wrapper">
                                 
                                  Task :
                            <div onClick={() => self.strikeUnstrike(task)} style={{flex:7}}>

                                {task.completed === false ? (
                                    <span>{task.title}</span>
                                    // <br></br>
                                    // <p>Category :  {task.label}</p>                       

                                  ) : (

                                    <strike>{task.title}</strike>
                                    // <br></br>
                                  )}
                                  <br></br>
                                  Category :  {task.label}                            
                                  
                                
                                                             
                             
  
                            </div>
                            {/* <div>{task.label}</div>  */}
                            <div style={{flex:1}}>
                                <button onClick={() => self.startEdit(task)}  aria-pressed="true" className="btn btn-outline-info">Edit</button>
                            </div>

                            <div style={{flex:1}}>
                                <button onClick={() => self.deleteItem(task)} aria-pressed="true" className="btn btn-outline-danger">Remove</button>
                            </div>
                            </div>
                        )
                    })}
              </div>
          </div>
          
        </div>
      )
  }
}



export default App;
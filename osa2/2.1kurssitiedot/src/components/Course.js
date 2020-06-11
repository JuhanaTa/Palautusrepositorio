import React from 'react'

//prints course using Header and Content
const Course= (props) =>{
    console.log(props, "inside course")
    return(
      <div>
        
      <Header header={props.course.name}/>
      <Content course={props.course}/>
      </div>
    )
  }

  const Header = (props) =>{
    return(
      <h3>
        {props.header}
      </h3>
    )
  }
  
  const Part = (props) =>{
    console.log(props, "inside part")
    return(
      <div>
      <p>{props.part.name} {props.part.exercises}</p>
      
      </div>
    )
  }
  
  
  const Content = ({course}) =>{
    console.log(course, "inside content")
    const exercises = course.parts.map(amount => amount.exercises)
      
    const total = exercises.reduce( (total, amount) => total + amount )
    //maps parts in course object and passes them to Part
    return(
      <div>
   
       {course.parts.map(part => 
         <Part key={part.id} part={part}/>
       )}
      <p>total of {total} exercises </p>
      </div>
    )
  }
export default Course
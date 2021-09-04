import React from 'react'

const Header = (props) => {
  return (
    <>
      <h2>{props.name}</h2>
    </>
  )
}

const PartsForContent = (props)=> {
  return(
    <p>
    {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(prt => 
        <PartsForContent part = {prt} key = {prt.id} />
        )
      }
    </>
  )
}

const Total = (props) => {
  const total = props.parts.reduce( (s, p) => {
    if(s.exercises){
      return p.exercises+s.exercises
    }
    return s + p.exercises
  })
  return (
    <>
      <p>Total of {total} exercises</p>
    </>
  )
}

const Course = (props) => {
  return(
    <>
    {props.courses.map(course =>
    <div key = {course.id}>
      <Header name = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
    )
    }
    </>
  )
}

export {Course};
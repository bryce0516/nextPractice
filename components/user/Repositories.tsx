import React from 'react'

type Props = any

const Repositories = (props: any) => {
  return (
    <div>Repositories</div>
  )
}

const styles = {
  repositoryPagination: {
    border: "1px solid rgba(27, 31,35, 0.15)",
    borderRaidus: 3,
    width: "fit-content",
    margin: "auto",
    marginTop: 20
  },
  button: {
    padding: "6px 12px",
    fontSize: 14,
    border:0,
    color: "#0366d6",
    fontWeight: "bold",
    cursor: "pointer",
    outline: "none"
  },
  
}

export default Repositories
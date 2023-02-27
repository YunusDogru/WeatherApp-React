import React from 'react'

function Bio() {
  return (
    <div className="bio">
        <a href="https://github.com/YunusDogru" target="_blank" className="githublink">
        <img src="./img/bio.jpg" alt="" className="bioimage"/>
        <h3 className="name">Yunus Doğru</h3>
        <h6 className="job">Front-End Developer</h6>
      </a>
    </div>
  )
}

export default Bio
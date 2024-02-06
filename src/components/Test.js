import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam'
import { useRef} from 'react'
import "../styles/Test.css";
import Rightsection from './RightSection';
import Listsections from './ListSections';
import TestMcq from './TestMcq';
import Subjective from './Subjective';
function Test() {
    const [view, setView] = useState(null);
    const changeView = (e) => {
        console.log('change view');
        setView(e.target.innerHTML);
    }
    return (
        <div className='Mycontainer'>
            
            <div className='Myheader'>
                <div className='Myleft'>
                    <a href="/section">Sections</a>
                    <a href="/submit">Submit Test</a>
                </div>
                <Rightsection/>
            </div>
            <div className="Mybody">
                <div className='Mysections'>
                    <Listsections sec={view} changeView={ changeView} />
                </div>
                {
                    view === 'MCQ' ? (
                    <div className='Myquestion_view'>
                        <TestMcq/>
                    </div>
                    ) : (
                        <div className='Myquestion_view'>
                                {/* <h1>{ view}</h1> */}
                                <Subjective/>
                        </div>
                    )
                }
                   
            </div>
      </div>
   
  );
}

export default Test;

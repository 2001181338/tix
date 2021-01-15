import React, { useState, useEffect } from 'react'
import ReactPlayer from "react-player"
export default function ModalVideo(props) {
    const [modalVideo, setModalVideo] = useState("")
    const { modal } = props;
    const [pause, setPause] = useState(true)
    useEffect(() => {
        setModalVideo(modal)
        setPause(true)
    }, [modal])
    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                            setPause(false)
                        }}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ReactPlayer url={modalVideo === null ? 'http://www.youtube.com/watch?v=7sDY4m8KNLc&t=255s' : modal} playing={pause} controls width="100" />
                    </div>
                </div>
            </div>
        </div>


    )
}

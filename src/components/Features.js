import React from "react"
import PropTypes from "prop-types"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage"

import { FaBullhorn, FaMusic, FaPencilAlt, FaPlane, FaRegClock, FaRegEnvelope, FaTv, FaVideo } from "react-icons/fa"

const FeatureIcon = (icon) => {
    switch (icon) {
        case "bullhorn":
            return <FaBullhorn />
        case "clock":
            return <FaRegClock />
        case "envelope":
            return <FaRegEnvelope />
        case "music":
            return <FaMusic />
        case "pencil":
            return <FaPencilAlt />
        case "plane":
            return <FaPlane />
        case "television":
            return <FaTv />
        case "video-camera":
            return <FaVideo />
        default:
            break
    }
}

const FeatureGrid = ({ gridItems }) => (
    <div className="columns is-multiline">
        {gridItems.map((item) => (
            <div key={item.text} className="column is-6">
                <section className="section">
                    <div
                        className="has-text-centered"
                        style={{
                            width: "240px",
                            display: "inline-block",
                        }}
                    >
                        <i className="has-text-primary is-size-1">{FeatureIcon(item.icon)}</i>
                        <h3 className="is-size-4">{item.title}</h3>
                        <PreviewCompatibleImage imageInfo={item} />
                    </div>

                    <p>{item.text}</p>
                </section>
            </div>
        ))}
    </div>
)

FeatureGrid.propTypes = {
    gridItems: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string,
            image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
            text: PropTypes.string,
            title: PropTypes.string,
        })
    ),
}

export default FeatureGrid

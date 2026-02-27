import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import WindowWrapper from "../WindowWrapper";
import { experienceItems } from "../../data/experienceItems";
import { Accordion, AccordionItem } from "../Accordion";

type AboutThisDevWindowProps = {
  onClose: () => void;
};

const AboutThisDevWindow = ({ onClose }: AboutThisDevWindowProps) => {
  return (
    <WindowWrapper
      onClose={onClose}
      disableMinimize
      disableMaximize
      disableResizing
    >
      <div className="w-aboutThisDev">
        <div className="w-aboutThisDev__header">
          <div className="w-aboutThisDev__header_logo" aria-hidden>
            <FontAwesomeIcon icon={faApple} />
          </div>
          <div className="w-aboutThisDev__header_aboutMe">
            <h2>Dario Hunjadi</h2>
            <p>Software Engineer</p>
            <small>
              Self-taught software engineer with an MBA. Experienced in building
              web and mobile applications using React and React Native.
            </small>
          </div>
        </div>

        <div className="w-aboutThisDev__meta">
          <span>Zagreb, Croatia</span>
          <a
            href="https://github.com/dhunjadi"
            target="_blank"
            rel="noreferrer"
          >
            github.com/dhunjadi
          </a>
        </div>

        <Accordion className="w-aboutThisDev__accordion">
          <AccordionItem
            title="Experience (Last Three)"
            contentClassName="w-aboutThisDev__accordion_content"
          >
            {experienceItems.map((item) => (
              <article key={`${item.company}-${item.period}`}>
                <h3>{item.title}</h3>
                <p>{item.company}</p>
                <small>{item.period}</small>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </AccordionItem>

          <AccordionItem
            title="Skills"
            contentClassName="w-aboutThisDev__accordion_content"
          >
            <p>
              HTML, CSS, JavaScript, React, React Native, Next.js, TypeScript,
              Redux, Zustand, TanStack Query
            </p>
          </AccordionItem>

          <AccordionItem
            title="Education & Languages"
            contentClassName="w-aboutThisDev__accordion_content"
          >
            <p>
              <strong>Electrical Engineering Technician</strong>
              <br />
              Elektrotehnicka skola Zagreb (2008 - 2012)
            </p>
            <p>
              <strong>MBA</strong>
              <br />
              Karlovac University of Applied Sciences (2014 - 2020)
            </p>
            <p>Croatian, English</p>
          </AccordionItem>
        </Accordion>
      </div>
    </WindowWrapper>
  );
};

export default AboutThisDevWindow;

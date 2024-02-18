import { useRecoilState } from "recoil";
import { FaCheckCircle } from "react-icons/fa";
import { togglestate } from "../store/toggle";
import {
  PiNumberCircleEightFill,
  PiNumberCircleFiveFill,
  PiNumberCircleFourFill,
  PiNumberCircleOneFill,
  PiNumberCircleSevenFill,
  PiNumberCircleSixFill,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoFill,
} from "react-icons/pi";
import { PiNumberCircleNineFill } from "react-icons/pi";
import { Button, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
interface timeline {
  date: String;
  event: String[];
  completed: boolean;
  logo: any;
}
const Timeline = () => {
  const [status, setstatus] = useState(false);
  const [toggle, settoggle] = useRecoilState(togglestate);
  const [editmode, setmode] = useState<boolean>(false);
  const [timelines, settimeline] = useState<timeline[]>();
  const user = {
    name: "rahul",
    role: "scrummaster",
  };
  useEffect(() => {
    const getTimeline = async () => {
      try {
        const resp = await fetch("http://localhost:5000/timeline");
        const response = await resp.json();
        const data = response.data;
        const parsedData = data.map((obj: any) => {
          return {
            ...obj,
            events: JSON.parse(obj.events), // Parse the events string into an array
          };
        });
        console.log(parsedData);

        settimeline(parsedData);
        // Log fetched data
      } catch (error) {
        console.error("Error fetching timeline:", error);
      }
    };
    getTimeline();
  }, [editmode]);
  const events = [
    { logo: <PiNumberCircleOneFill /> },
    {
      logo: <PiNumberCircleTwoFill />,
    },
    {
      logo: <PiNumberCircleThreeFill />,
    },
    {
      logo: <PiNumberCircleFourFill />,
    },
    {
      logo: <PiNumberCircleFiveFill />,
    },
    {
      logo: <PiNumberCircleSixFill />,
    },
    {
      logo: <PiNumberCircleSevenFill />,
    },
    {
      logo: <PiNumberCircleEightFill />,
    },
    {
      logo: <PiNumberCircleNineFill />,
    },
  ];
  return (
    <div
      className={`overflow-x-hidden w-screen h-screen bg-slate-100 ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
    >
      <div
        className=" bg-cover bg-no-repeat bg-center sm:h-[500px] h-[300px]  w-full "
        style={{
          backgroundImage: "url(https://i.imgur.com/F0yCdfn.jpg)",
        }}
      ></div>
      <div className="text-[35px] m-10">How it Works ?</div>
      <div className="flex justify-center">
        <div className="bg-white shadow-custom w-screen mx-10 my-5">
          <div className="fontstylish font-weight-400 pt-10 px-10 text-[28px]">
            Students
          </div>
          <div className="px-10 text-[18px] fontstylish">
            Students contact the mentors they want to work with and write up a
            project proposal for the spring. If selected, students spend a month
            coding under the guidance of their mentors. They're also eligible
            for prizes and goodies.
          </div>
          <div className="fontstylish font-weight-400 px-10 mt-5 text-[28px]">
            Mentors
          </div>
          <div className="px-10 text-[18px] fontstylish">
            Willing seniors from institute or alumni can choose to mentor a
            student project. Mentors and students work together to determine
            appropriate milestones and requirements for the spring. Mentor
            interaction is a vital part of the program.
          </div>
          <div className="flex justify-between m-10">
            <div className="sm:text-[35px] text-[25px]">Timeline</div>
            {user.role == "scrummaster" ? (
              <Button variant="contained" onClick={() => setmode(!editmode)}>
                Edit Page
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full">
            <div className=" m-10 shadow-custom pb-10 ">
              <ul className="list-disc">
                {timelines && timelines.length > 0 ? (
                  timelines.map((x: timeline, index) => {
                    return (
                      <>
                        <div className="flex ">
                          {editmode ? (
                            <Checkbox
                              checked={status}
                              onChange={() => {
                                setstatus(!status);
                              }}
                            />
                          ) : x.completed ? (
                            <li className=" py-6 px-5 list-none text-blue-600 text-[24px]">
                              <FaCheckCircle />
                            </li>
                          ) : (
                            <li className=" py-6 px-5 list-none text-slate-400 text-[28px]">
                              {events[index].logo}
                            </li>
                          )}
                          <div className="flex justify-between w-full ">
                            <li className="py-5 text-[20px] list-none text-blue-600 font-weight">
                              {x.date}
                            </li>
                            {editmode && (
                              <div>
                                <Button className="m-5 p-3" variant="contained">
                                  Save
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        {x.events.map((y) => {
                          return (
                            <li className="mx-11  text-[16px] font-weight-400">
                              {y}
                            </li>
                          );
                        })}
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </ul>
              {editmode && (
                <div className="m-5 ">
                  <Button
                    onClick={() => {
                      setmode(!editmode);
                    }}
                    variant="contained"
                    className="h-[35px] w-[80px]"
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;

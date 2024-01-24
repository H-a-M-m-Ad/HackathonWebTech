import { useState } from "react";
import AutoCompleteText from "./AutoCompleteText";
import courses from "./listCourses";
const Curriculum = () => {
  interface Semester {
    sno: number;
    name: string;
  }
  type Course = {
    courseid: number;
    code: string;
    title: string;
    crhr: number;
    semester: number;
  };

  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  let sems: Semester[] = [
    { sno: 1, name: "1st" },
    { sno: 2, name: "2nd" },
    { sno: 3, name: "3rd" },
    { sno: 4, name: "4th" },
    { sno: 5, name: "5th" },
    { sno: 6, name: "6th" },
    { sno: 7, name: "7th" },
    { sno: 8, name: "8th" }
  ];
  const handleSuggestionSelected = (value: Course) => {
    setSelectedCourses([...selectedCourses, value]);
  };
  return (
    <div>
      <table>
        <tbody>
          {sems.map((SingleSem) => {
            return (
              <>
                <tr>
                  <th style={{ width: "75px" }}>Code</th>
                  <th style={{ width: "450px", textAlign: "center" }}>Title</th>
                  <th style={{ width: "25px", textAlign: "center" }}>Cr</th>
                </tr>
                <tr>
                  <th colSpan={3} style={{ fontWeight: "bold" }}>
                    {SingleSem.name} Semester
                  </th>
                </tr>
                {selectedCourses.map((SingleSelectedCourse: any) => {
                  if (SingleSelectedCourse.semester == SingleSem.sno)
                    return (
                      <>
                        <tr>
                          <td> {SingleSelectedCourse.code}</td>
                          <td style={{ height: "25px" }}>
                            {SingleSelectedCourse.title}
                          </td>
                          <td> {SingleSelectedCourse.crhr}</td>
                        </tr>
                      </>
                    );
                })}

                {courses.filter(function (course) {
                  return (
                    course.semester == SingleSem.sno &&
                    !selectedCourses.some(
                      (selectedCourse) => selectedCourse.code === course.code
                    )
                  );
                }).length == 0 ? (
                  <></>
                ) : (
                  <tr>
                    <td> </td>
                    <td style={{ height: "25px" }}>
                      <AutoCompleteText
                        items={courses.filter(function (course) {
                          return (
                            course.semester == SingleSem.sno &&
                            !selectedCourses.some(
                              (selectedCourse) =>
                                selectedCourse.code === course.code
                            )
                          );
                        })}
                        SelectedItem={handleSuggestionSelected}
                      />
                    </td>
                    <td></td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Curriculum;

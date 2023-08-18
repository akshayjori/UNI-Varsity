import React, { useEffect, useState } from "react";
import { getCourseReport } from "./services/adminRequestHelper";
import cc from "../css/coursereport.module.css";
import Charts from "react-apexcharts";
const CourseReport = () => {
  const [labelArray, setLabelArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);

  //// report setup .........................................

  useEffect(() => {
    getCourseReport()
      .then((res) => {
        const report = res.data;
        var labels = [];
        var datas = [];
        report.forEach((element) => {
          labels.push(element.courseName);
          datas.push(element.noOfRegistrations);
        });
        setLabelArray(labels);
        setDataArray(datas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={cc.piechart}>
      <Charts
        type="donut"
        series={dataArray}
        options={{
          labels: labelArray,
          plotOptions: {
            pie: {
              offsetX: 50,
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: true,
                    fontSize: 40,
                    color: "#f90000",
                  },
                },
              },
            },
          },
          dataLabels: {
            enabled: true,
          },
        }}
      />
    </div>
  );
};

export default CourseReport;

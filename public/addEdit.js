import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showJobs } from "./jobs.js";

let addEditDiv = null;
let company = null;
let position = null;
let status = null;
let addingJob = null;

export const showAddEdit = async (jobId) => {
    if (e.target === addingJob) {
        enableInput(false);
      
        let method = "POST";
        let url = "/api/v1/jobs";
      
        if (addingJob.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/jobs/${addEditDiv.dataset.id}`;
        }
      
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              company: company.value,
              position: position.value,
              status: status.value,
            }),
          });
      
          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The job entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The job entry was created.";
            }
      
            company.value = "";
            position.value = "";
            status.value = "pending";
            showJobs();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      }
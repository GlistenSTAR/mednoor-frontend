<script>
  import { onMount } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { errors, seletedTemp, search_result } from "../../store";
  import { updateTemplate, printTemplate } from "../../apis/template";
  import isEmpty from "../../utils/is-empty";
  import { navigate } from "svelte-navigator";

  const { addNotification } = getNotificationsContext();

  onMount(() => {
    errors.set({});
  });

  let tempId;

  let tempData = {
    firstName: "",
    lastName: "",
    date: "",
    history: {
      allergies: "",
      currentMeds: "",
      medicalHistory: "",
      socialHistory: "",
      familyHistory: "",
    },
    state: {
      bp: 0,
      pulse: 0,
      respRate: 0,
      temp: 0,
      height: 0,
      weight: 0,
      bmi: 0,
    },
    description: {
      chiefComplaint: "",
      hpi: "",
      subject: "",
      objective: "",
      assessment: "",
      plan: "",
    },
  };

  seletedTemp.subscribe((temp) => {
    if (isEmpty(temp)) {
      navigate("/dashboard", { replace: true });
    } else {
      tempId = temp.id;
      tempData.firstName = temp.firstName;
      tempData.lastName = temp.lastName;
      tempData.date = temp.date;
      tempData.history.allergies = temp.allergies;
      tempData.history.currentMeds = temp.currentMeds;
      tempData.history.medicalHistory = temp.medicalHistory;
      tempData.history.socialHistory = temp.socialHistory;
      tempData.history.familyHistory = temp.familyHistory;
      tempData.state.bp = temp.bp;
      tempData.state.pulse = temp.pulse;
      tempData.state.respRate = temp.respRate;
      tempData.state.temp = temp.temp;
      tempData.state.height = temp.height;
      tempData.state.weight = temp.weight;
      tempData.state.bmi = temp.bmi;
      tempData.description.chiefComplaint = temp.chiefComplaint;
      tempData.description.hpi = temp.hpi;
      tempData.description.subject = temp.subject;
      tempData.description.objective = temp.objective;
      tempData.description.assessment = temp.assessment;
      tempData.description.plan = temp.plan;
    }
  });

  let errs = {};

  errors.subscribe((value) => {
    errs = value;
  });

  const updateTemp = async () => {
    const res = await updateTemplate(tempData, tempId);
    if (res.msg === "success") {
      addNotification({
        text: "Successfully updated",
        position: "top-right",
        type: "success",
        removeAfter: 3000,
      });

      let temp = [];
      search_result.subscribe((v) => {
        temp = v;
      });
      const updateIndex = temp.findIndex((temp) => {
        return temp.id.toString() === tempId.toString();
      });

      temp[updateIndex].firstName = tempData.firstName;
      temp[updateIndex].lastName = tempData.lastName;
      temp[updateIndex].date = tempData.date;

      temp[updateIndex].allergies = tempData.history.allergies;
      temp[updateIndex].currentMeds = tempData.history.currentMeds;
      temp[updateIndex].medicalHistory = tempData.history.medicalHistory;
      temp[updateIndex].socialHistory = tempData.history.socialHistory;
      temp[updateIndex].familyHistory = tempData.history.familyHistory;

      temp[updateIndex].bp = tempData.state.bp;
      temp[updateIndex].pulse = tempData.state.pulse;
      temp[updateIndex].respRate = tempData.state.respRate;
      temp[updateIndex].temp = tempData.state.temp;
      temp[updateIndex].height = tempData.state.height;
      temp[updateIndex].wight = tempData.state.wight;
      temp[updateIndex].bmi = tempData.state.bmi;

      temp[updateIndex].chiefComplaint = tempData.description.chiefComplaint;
      temp[updateIndex].hpi = tempData.description.hpi;
      temp[updateIndex].subject = tempData.description.subject;
      temp[updateIndex].objective = tempData.description.objective;
      temp[updateIndex].assessment = tempData.description.assessment;
      temp[updateIndex].plan = tempData.description.plan;

      search_result.set(temp);
    }
  };

  const printTemp = async () => {
    await printTemplate(tempData);
  };
</script>

<form on:submit|preventDefault={updateTemp}>
  <div class="container-fluid content-p">
    <!-- Patient Name, Date -->
    <div class="d-flex mb-4 patient-data">
      <div>
        <div class="form-inline">
          <label for="firstName">Firstname: </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            class="form-control mx-2"
            bind:value={tempData.firstName}
            placeholder="Enter first name"
          />
        </div>
        {#if errs.firstName}
          <div class="mt-2 ml-5 text-red">{errs.firstName}</div>
        {/if}
      </div>
      <div>
        <div class="form-inline">
          <label for="lastName">Lastname: </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            class="form-control mx-2"
            bind:value={tempData.lastName}
            placeholder="Enter last name"
          />
        </div>
        {#if errs.lastName}
          <div class="mt-2 ml-5 text-red">{errs.lastName}</div>
        {/if}
      </div>
      <div>
        <div class="form-inline">
          <label for="date">Date: </label>
          <input
            type="text"
            name="date"
            id="date"
            class="form-control mx-2"
            value={tempData.date}
            placeholder="Enter last name"
            readonly
          />
        </div>
        {#if errs.lastName || errs.firstName}
          <div class="mt-2 ml-5 text-red" />
        {/if}
      </div>
    </div>
    <!-- History input -->
    <div class="container-fluid my-3 card">
      <ul class="nav nav-tabs card-header-pills" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#allergies"
            >Allergies</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#currentMeds"
            >Current Meds</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#medicalHistory"
            >Medical History</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#socialHistory"
            >Social History</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#familyHistory"
            >Family History</a
          >
        </li>
      </ul>
      <div class="tab-content card-body px-0">
        <div id="allergies" class="tab-pane active">
          <textarea
            class="text-width form-control"
            name="allergies"
            id="allergies"
            rows="5"
            bind:value={tempData.history.allergies}
          />
        </div>
        <div id="currentMeds" class="tab-pane fade">
          <textarea
            class="text-width form-control"
            name="currentMeds"
            id="currentMeds"
            rows="5"
            bind:value={tempData.history.currentMeds}
          />
        </div>
        <div id="medicalHistory" class="tab-pane fade">
          <textarea
            class="text-width form-control"
            name="medicalHistory"
            id="medicalHistory"
            rows="5"
            bind:value={tempData.history.medicalHistory}
          />
        </div>
        <div id="socialHistory" class="tab-pane fade">
          <textarea
            class="text-width form-control"
            name="socialHistory"
            id="socialHistory"
            rows="5"
            bind:value={tempData.history.socialHistory}
          />
        </div>
        <div id="familyHistory" class="tab-pane fade">
          <textarea
            class="text-width form-control"
            name="familyHistory"
            id="familyHistory"
            rows="5"
            bind:value={tempData.history.familyHistory}
          />
        </div>
      </div>
    </div>
    <!-- State input -->
    <div class="d-flex card state-panel pt-2">
      <div class="form-group text-left">
        <label for="bp">BP</label>
        <input
          type="number"
          class="form-control state-input"
          id="bp"
          name="bp"
          bind:value={tempData.state.bp}
        />
      </div>
      <div class="form-group text-left">
        <label for="pulse">Pulse</label>
        <input
          type="number"
          class="form-control state-input"
          id="pulse"
          name="pulse"
          bind:value={tempData.state.pulse}
        />
      </div>
      <div class="form-group text-left">
        <label for="respRate">Resp. Rate</label>
        <input
          type="number"
          class="form-control state-input"
          id="respRate"
          name="respRate"
          bind:value={tempData.state.respRate}
        />
      </div>
      <div class="form-group text-left">
        <label for="temp">Temp</label>
        <input
          type="number"
          class="form-control state-input"
          id="temp"
          name="temp"
          bind:value={tempData.state.temp}
        />
      </div>
      <div class="form-group text-left">
        <label for="height">Height</label>
        <input
          type="number"
          class="form-control state-input"
          id="height"
          name="height"
          bind:value={tempData.state.height}
        />
      </div>
      <div class="form-group text-left">
        <label for="weight">Weight</label>
        <input
          type="number"
          class="form-control state-input"
          id="weight"
          name="weight"
          bind:value={tempData.state.weight}
        />
      </div>
      <div class="form-group text-left">
        <label for="bmi">BMI</label>
        <input
          type="number"
          class="form-control state-input"
          id="bmi"
          name="bmi"
          bind:value={tempData.state.bmi}
        />
      </div>
    </div>
    <!-- Description -->
    <div class="container-fluid my-3 card">
      <ul class="nav nav-tabs card-header-pills" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#chiefComplaint"
            >Chief Complaint</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#hpi">HPI</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#subject">Subject</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#objective">Objective</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#assessment">Assessment</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#plan">Plan</a>
        </li>
      </ul>
      <div class="tab-content card-body px-0">
        <div id="chiefComplaint" class="tab-pane active">
          <textarea
            class="text-width form-control"
            name="chiefComplaint"
            id="chiefComplaint"
            rows="5"
            bind:value={tempData.description.chiefComplaint}
          />
        </div>
        <div id="hpi" class="tab-pane fade">
          <textarea
            class="text-width form-control"
            name="hpi"
            id="hpi"
            rows="5"
            bind:value={tempData.description.hpi}
          />
        </div>
        <div id="subject" class="tab-pane fade">
          <textarea
            class="text-width form-control"
            name="subject"
            id="subject"
            rows="5"
            bind:value={tempData.description.subject}
          />
        </div>
        <div id="objective" class="tab-pane fade">
          <textarea
            class="text-width form-control"
            name="objective"
            id="objective"
            rows="5"
            bind:value={tempData.description.objective}
          />
        </div>
        <div id="assessment" class="tab-pane fade">
          <textarea
            class="text-width form-control"
            name="assessment"
            id="assessment"
            rows="5"
            bind:value={tempData.description.assessment}
          />
        </div>
        <div id="plan" class="tab-pane fade">
          <textarea
            class="text-width form-control"
            name="plan"
            id="plan"
            rows="5"
            bind:value={tempData.description.plan}
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-success btn-lg mx-2">Update</button>
      <button
        type="button"
        class="btn btn-primary btn-lg mx-2"
        on:click={printTemp}>Print</button
      >
    </div>
  </div>
</form>

<style>
  .text-width {
    width: 100%;
  }

  .state-input {
    width: 7rem;
    border-radius: 10px;
  }

  .state-panel {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .content-p {
    padding-top: 5rem;
    padding-bottom: 2rem;
  }

  .patient-data {
    flex-wrap: wrap;
  }

  .form-inline {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .text-red {
    color: red;
  }
</style>

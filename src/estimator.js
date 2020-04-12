


var data = {
	region : {
		name : "Africa", 
		avgAge : 19.7, 
		avgDailyIncomeInUSD : 5, 
		avgDailyIncomePopulation : 0.71, 
	}, 
	
	periodType : "days", 
	timeToElapse : 58, 
	reportedCases : 674, 
	population : 66622705, 
	totalHospitalBeds : 1380614,
};



const covid19ImpactEstimator = function (data) {
	
	var impact = {};
	var severeImpact = {};
	
	//get currently infected people value
	impact.currentlyInfected = Math.trunc(data.reportedCases * 10);
	
	severeImpact.currentlyInfected = Math.trunc(data.reportedCases * 50);
	
	
	//get estimated number of infected people in 28 days 
	impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected * 512);
	
	severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected * 512);
	
	
	//get number of severe positive cases that will require hospitalization
	impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * (15/100));
	
	severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * (15/100));
	
	
	//get number of available hospital beds
	
	impact.hospitalBedsByRequestedTime = Math.trunc(data.totalHospitalBeds - impact.severeCasesByRequestedTime);
	
	severeImpact.hospitalBedsByRequestedTime = Math.trunc(data.totalHospitalBeds - severeImpact.severeCasesByRequestedTime);
	
	
	//get number of cases that requires ICU care
	impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * (5/100));
	
	severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * (5/100));
	
	
	//get number of cases that requires ventilation
	impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * (2/100));
	
	severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * (2/100));
	
	
	//get daily economy losses
	impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * 0.65 * 1.5) / 30);
	
	severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * 0.65 * 1.5) / 30);
	
	
	
	
	return {
		data : data, 
		impact : impact, 
		severeImpact : severeImpact, 
	};
};




export default covid19ImpactEstimator;




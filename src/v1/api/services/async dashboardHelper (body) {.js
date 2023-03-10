async dashboardHelper(body) {

  try {
    let driverData
    let userData
    let totalFair

    let selectParams1 = `count(driver_id) AS total_driver`;
    let driverData1 = await db.select("uc_driver", selectParams1)
    driverData = driverData1[0]

    let selectParams2 = `count(user_id) AS total_user`;
    let userData2 = await db.select("mst_user", selectParams2)
    userData = userData2[0]

    let selectParams3 = `count(total_fair) AS total_fair`;
    let fairData3 = await db.select("uc_rides", selectParams3)
    totalFair = fairData3[0]

    // filter ###########################################################################################
    let endDate = nowDate,
      startDate = endDate;

    console.log("s---------------------", startDate);
    console.log("e---------------------", endDate);

    switch (body.filter) {
      case 'day':
        startDate = moment(startDate).startOf('day').format("YYYY-MM-DD HH:mm:ss.SSS")
        break;
      case 'week':
        startDate = moment(startDate).startOf('week').format("YYYY-MM-DD HH:mm:ss.SSS");
        break;
      case 'month':
        startDate = moment(startDate).startOf('month').format("YYYY-MM-DD HH:mm:ss.SSS");
        break;
      case 'year':
        startDate = moment(startDate).startOf('year').format("YYYY-MM-DD HH:mm:ss.SSS");
        break;
      default:
        startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss.SSS");
        break;
    }


    if (body.filter == 'day') {
      let selectParams = `count(driver_id) AS total_driver`;
      let where = ` created_date >= '${startDate}'`;
      let driverData1 = await db.select("uc_driver", selectParams, where);
      driverData = driverData1[0]

      let selectParams1 = `count(user_id) AS total_user`;
      let where1 = ` created_date >= '${startDate}'`;
      let userData1 = await db.select("mst_user", selectParams1, where1);
      userData = userData1[0]

      let selectParams2 = `count(total_fair) AS total_fair`;
      let where2 = ` created_date >= '${startDate}'`;
      let totalFair1 = await db.select("uc_rides", selectParams2, where2);
      totalFair = totalFair1[0]
    }


    if (body.filter == 'week' || body.filter == 'month' || body.filter == 'year') {

      let selectParams = `count(driver_id) AS total_driver`;
      let where = ` created_date >= '${startDate}' AND created_date < '${endDate}'`;
      let driverData1 = await db.select("uc_driver", selectParams, where);
      driverData = driverData1[0]

      let selectParams1 = `count(user_id) AS total_user`;
      let where1 = ` created_date >= '${startDate}' AND created_date < '${endDate}'`;
      let userData1 = await db.select("mst_user", selectParams1, where1);
      userData = userData1[0]

      let selectParams2 = `count(total_fair) AS total_fair`;
      let where2 = ` created_date >= '${startDate}' AND created_date < '${endDate}'`;
      let totalFair1 = await db.select("uc_rides", selectParams2, where2);
      totalFair = totalFair1[0]

    }



    // ##################################################################################################


    if (body.starting_date && body.ending_date) {

      if (body.starting_date == body.ending_date) {
        throw "SAME_DATE"
      }

      console.log("hello !@!@!@!@!@!@!@!@!");

      let startDate = moment(body.starting_date).format("YYYY-MM-DD HH:mm:ss.SSS")
      console.log("startDate------------------", startDate);

      let endDate = moment(body.ending_date).endOf('day').format("YYYY-MM-DD HH:mm:ss.SSS")
      console.log("endDate-------------------", endDate);




      let selectParams = `count(driver_id) AS total_driver`;
      let where = `created_date >= '${startDate}' AND created_date <= '${endDate}'`

      console.log("where::", where);
      let driverData2 = await db.select("uc_driver", selectParams, where);
      driverData = driverData2[0]
      console.log("driverData date %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", driverData);


      // let selectParams1 = `count(user_id) AS total_user`;
      // let where1 = `created_date >= '${startDate}' AND created_date <= '${endDates}'`

      // console.log("where1::",where1);
      // let userData2 = await db.select("mst_user", selectParams1, where1);
      // userData = userData2[0]
      // console.log("userData date %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",userData);


      // let selectParams2 = `count(total_fair) AS total_fair`;
      // let where2 = `created_date >= '${startDate}' AND created_date <= '${endDates}'`

      // console.log("where2::",where2);
      // let totalFair2 = await db.select("uc_rides", selectParams2, where2);
      // totalFair = totalFair2[0]
      // console.log("totalfair date %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",totalFair);
    }



    let distance_rate = {
      driver_per_distance_rate: 10
    }


    let finalResult = { ...driverData, ...userData, ...totalFair, ...distance_rate }

    // console.log("final result ========================================================================================",finalResult);

    return finalResult

  } catch (error) {
    console.log(error);
    return promise.reject(error);
  }

}
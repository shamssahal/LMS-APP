import React,{useRef} from 'react';
import CountUp from 'react-countup';

// import {
//     getCustomersSelector,
//     getActiveCustomersSelector,
//     getPendingCustomersSelector,
//     getPartiallyActiveCustomersSelector,
//     getInactiveCustomersSelector
// } from '../../Selectors/customers'

const AnalyticsCard = ({title, data, info1, info2}) => {

    const ref = useRef()
    // const allData = useSelector(state=>getCustomersSelector(state))
    // const activeData = useSelector(state=>getActiveCustomersSelector(state))
    // const pendingData = useSelector(state=>getPendingCustomersSelector(state))
    // const paritallyActiveData = useSelector(state=>getPartiallyActiveCustomersSelector(state))
    // const inactiveData = useSelector(state=>getInactiveCustomersSelector(state))
    // const onCardClick = () =>{
    //     switch(ref.current.innerHTML){
    //         case 'Pending Customers':
    //             dispatch(setDynamicCustomers(pendingData))
    //             break;
    //         case 'Active Customers':
    //             dispatch(setDynamicCustomers(activeData))
    //             break;
    //         case 'Partially Active':
    //             dispatch(setDynamicCustomers(paritallyActiveData))
    //             break;
    //         case 'Inactive Customers':
    //             dispatch(setDynamicCustomers(inactiveData))
    //             break;
    //         default: dispatch(setDynamicCustomers(allData))
    //     }
    // }
    return (
        <div className="col-lg-4">
        <div className="card widget-flat"
            // onClick={()=>{onCardClick()}}
        >
          <div className="card-body">
            <div className="float-right">
            </div>
            <h5
              className="text-muted font-weight-normal mt-0"
              title="Number of Customers"
              ref={ref}
            >
              {title}
            </h5>
            <h3 className="mt-3 mb-3">
                <CountUp 
                    end={data}
                    duration={3}
                />
            </h3>
            {/* <p className="mb-0 text-muted">
              <span className="text-success mr-2">
              <i className="mdi mdi-arrow-up-bold"></i>{info1}</span>
              <span className="text-nowrap">{info2}</span>
            </p> */}
          </div>
        </div>
      </div>
    );
}
 
export default AnalyticsCard;
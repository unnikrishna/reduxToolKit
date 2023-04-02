import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistrants, getAllRegistrants, fetchRegistrantInfoById } from "../store/reducers/thunkSlice"
import Spinner from "../presentation/Spinner";

const VaccineThunk = (props) => {

    const dispatch = useDispatch();

    const loading = useSelector((state) => state.thunkdata.loading);
    const vaccineList = useSelector(getAllRegistrants);

    useEffect(() => {
        const promise = dispatch(fetchRegistrants())
        return () => {
            promise.abort();
        }
    }, [dispatch]);

    let display = (<Spinner />);

    if (!loading) {
        display = <table className="table">
            <thead>
                <tr>
                    <td>Member</td>
                    <td>Date</td>
                    <td>Vaccine</td>
                    <td>Additional Info</td>
                </tr>
            </thead>
            <tbody>
                {vaccineList.map((member, i) => {
                    return (
                        <tr key={i}>
                            <td>{member.name}</td>
                            <td> {member.date}</td>
                            <td>{member.vaccine}</td>
                            <td>{
                                (member.hasOwnProperty('additionalDetails') && member.additionalDetails) ?
                                    member.vaccineOfficer + " | Center: " + member.center + " | Time: " + member.time
                                    : <button type="button" onClick={() => (dispatch(fetchRegistrantInfoById(member.benid)))}>Show More</button>
                            }
                            </td>

                        </tr>
                    );
                })}
            </tbody>

        </table>
    }

    return (<>
        <h3>Vaccine List - Thunk Way</h3>
        {display}
    </>);
}



export default VaccineThunk;
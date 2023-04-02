import React from 'react';
import { connect } from "react-redux";



const VacccineList = (props) => {

    return (
        <>
            <h3>Vaccine List</h3>
            <table className="table">
                <thead>
                    <tr>
                        <td>Member</td>
                        <td>Date</td>
                        <td>Vaccine</td>

                    </tr>
                </thead>
                <tbody>
                    {props.vaccineList.map((member, i) => {
                        return (
                            <tr key={i}>
                                <td>{member.name}</td>
                                <td> {member.date}</td>
                                <td>{member.vaccine}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </>
    );
}

const mapStateToProps = (state) => {
    return {
        vaccineList: state.vaccine.registrants
    };
}


export default connect(mapStateToProps, null)(VacccineList);
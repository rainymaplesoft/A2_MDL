export class Constants{

    /* -- Route Config -- */

    public static PATH_DASHBOARD = 'dashboard';
    public static ROUTE_DASHBOARD = 'Route_Dashboard';

    public static PATH_STUDENTS = 'students';
    public static ROUTE_STUDENTS = 'Route_Students';

    public static PATH_STUDENT_DETAIL = 'student/:id/...';
    public static ROUTE_STUDENT_DETAIL = 'Route_Student_Detail';

    public static PATH_STUDENT_PROFILE = 'student_profile';
    public static ROUTE_STUDENT_PROFILE = 'Route_Profile';
    public static PATH_STUDENT_GROUP = 'student_group';
    public static ROUTE_STUDENT_GROUP = 'Route_Group';
    public static PATH_STUDENT_OBJECTIVES = 'student_objectives';
    public static ROUTE_STUDENT_OBJECTIVES = 'Route_Objectives';

    /* -- URL --- */
    public static URL_STUDENTS = 'app/data-access/students.json';
}
export interface IKeyValuePair{
    label:string,
    value:any
}
export  interface ISelectedItem{
    detail:any
}
export class Constants{

    /* -- Route Config -- */

    public static PATH_DASHBOARD = 'dashboard';
    public static ROUTE_DASHBOARD = 'Route_Dashboard';

    public static PATH_STUDENTS = 'students';
    public static ROUTE_STUDENTS = 'Route_Students';

    public static PATH_STUDENT_DETAIL = 'student/:id';
    public static ROUTE_STUDENT_DETAIL = 'Route_Student_Detail';

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
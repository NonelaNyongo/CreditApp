import mariadb
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote
from datetime import date
from CreditApp.modules import db_ops



#Vishay
#Establishes a connection with Maria DB and returns that connection as a variable called conn
def connect():
    '''Enter database details, such as user, password, host, port and database to connect to
    the database of choice'''
    try:
        conn = mariadb.connect(
            user="SvcSGTDEVSaserTwoAdmnAcc",
            password="5vc5GTD3V5@s3rTw0@dmn@cc",
            host="SRV007893",
            port=3306,
            database="SGTDEVSaserTwo",
            autocommit = True
        )
        return conn
    except mariadb.Error as e:
        return(print(f"Error connecting to MariaDB Platform: {e}"))


#Select statement for Vendors
def get_vendors():
    c = connect().cursor()
    c.execute("select * from vendor")
    vendors = c.fetchall()
    return vendors

#Insert Statement for a new vendor
def input_vendor(v_name):
    c = connect().cursor()
    c.execute("insert into vendor() values(DEFAULT,?)",(v_name,))
    connect().close()

    print("Vendor Inputted")

#Updated Statement for Vendors
def update_vendor(v_id,new_v_name):

    c = connect().cursor()
    print("I am at update")
    c.execute("UPDATE vendor set vendor_name = ? WHERE vendor_id = ?",(new_v_name,v_id))

    connect().commit()
    print("Vendor updated")

#Select Statement for implementation partners
def get_imp_partners():
    c = connect().cursor()
    c.execute("SELECT * FROM imp_partner")
    vendors = c.fetchall()
    return vendors

#Insert statement for implementation partners
def input_imp_partner(imp_name):
    try:
        c = connect().cursor()
        print("Do I get here")
        c.execute("INSERT INTO imp_partner VALUES(DEFAULT,?)",(imp_name,))

        get_imp_partners()
        connect().commit()

        connect().close()

    except:
        print("Vendor Not Inputted")

#Kevin's code
#Insert statement for status comments
def input_stat_com(comment,init_id):
        c = connect().cursor()
        print("Do I get here")
        c.execute("INSERT INTO init_status VALUES(DEFAULT,?,DEFAULT,?)",(init_id,comment))

        connect().close()
#Update statement for Implementation partners
def update_imp_partner(imp_id,new_imp_name):
    c = connect().cursor()
    print("I am at update")
    c.execute("UPDATE imp_partner set imp_partner_name = ? WHERE imp_partner_id = ?",(new_imp_name,imp_id))

    connect().commit()
    print("Vendor updated")

#Generic Query function. Accepts a query as a parameter 'Statement' and any arguments passed with that query as 'variables'.
#Variables should be passed as a tuple.
#Only tested this for Select statements so far. Insert, Update and Delete might not work because of 'return results' statement.
#Will work on it if there is any issues. Please refer to 'initiative_overview.py' line 20 for an example on how to use function.
def query(statement,variables):
    '''Enter database details, such as user, password, host, port and database to connect to
        the database of choice'''
    try:
        conn = mariadb.connect(
            user="SvcSGTDEVSaserTwoAdmnAcc",
            password="5vc5GTD3V5@s3rTw0@dmn@cc",
            host="SRV007893",
            port=3306,
            database="SGTDEVSaserTwo",
            autocommit = True
        )

        c = conn.cursor()
        c.execute(statement,variables)
        results = c.fetchall()

        return results

    except mariadb.Error as e:
        return (print(f"Error connecting to MariaDB Platform: {e}"))

#Insert Files
def insert_files(file_name,mimetype,comments,file,init_id):
        conn = connect();
        cursor = conn.cursor();
        insert_blob_query = """ INSERT INTO init_files
                                               (file_name, mimetype, comments, file, init_id) VALUES (?, ?, ?, ?, ?)
                                           """

        data_tuple = (file_name,mimetype,comments,file,init_id)
        print(file_name,mimetype,comments,init_id)
        cursor.execute(insert_blob_query, data_tuple)

        return('Query Executed')

#Krithi
#getting all capability level elements
def get_cap_0():
    c = connect().cursor()
    c.execute("select * from capability_0")
    cap_0 = c.fetchall()
    return cap_0

def get_cap_1():
    c = connect().cursor()
    c.execute("select * from capability_1")
    cap_1 = c.fetchall()
    return cap_1

def get_cap_2():
    c = connect().cursor()
    c.execute("select * from capability_2")
    cap_2 = c.fetchall()
    return cap_2

#function to return fk linked to a specific capability
#returns a single values - the name of the foreign key
def get_cap_fk(cap_id,cap_level):
    c = connect().cursor()
    if cap_level =='1':
        c.execute("select capability_name from capability_0 where capability_0_id = ?",(cap_id,))
        fk = c.fetchone()
    elif cap_level =='2':
        c.execute("select capability_name from capability_1 where capability_1_id = ?", (cap_id,))
        fk = c.fetchone()
    return fk

def add_cap_0(c_name):
    c = connect().cursor()
    c.execute("insert into capability_0 values (DEFAULT, ?)",(c_name,))
    print("hello")
    connect().close()

def edit_cap_0(old_name,new_name):
    c = connect().cursor()
    c.execute("update capability_0 set capability_name=? where capability_name=?",(new_name,old_name))
    connect().close()

def add_cap_1(c_name,fk_name):
    c = connect().cursor()
    #getting the ID of foreign key cap_0
    c.execute("select capability_0_id from capability_0 where capability_name =?",(fk_name,))
    capability_0_id = c.fetchone() #return a tuple with id in first index
    fk_id = capability_0_id[0]
    c.execute("insert into capability_1(capability_name,capability_0_id) values (?,?)",(c_name,fk_id,))
    connect().close()

def edit_cap_1(old_name,new_name):
    c = connect().cursor()
    c.execute("update capability_1 set capability_name=? where capability_name=?",(new_name,old_name))
    connect().close()

def add_cap_2(c_name,fk_name):
    c = connect().cursor()
    #getting the ID of foreign key cap_1
    c.execute("select capability_1_id from capability_1 where capability_name =?",(fk_name,))
    capability_1_id = c.fetchone() #return a tuple with id in first index
    fk_id = capability_1_id[0]
    c.execute("insert into capability_2(capability_name,capability_1_id) values (?,?)",(c_name,fk_id,))
    connect().close()

def edit_cap_2(old_name,new_name):
    c = connect().cursor()
    c.execute("update capability_2 set capability_name=? where capability_name=?",(new_name,old_name))
    connect().close()

#editing first accordian item of initiative
def edit_init_1(params):
    c = connect().cursor()
    print(params)
    c.execute("""UPDATE initiative
                     SET init_name = (%s),
                     init_cluster= (%s),
                     init_segment= (%s),
                     init_bus_unit= (%s),
                     init_country= (%s),
                     init_stage= (%s),
                     init_capability_description= (%s),
                     init_purpose= (%s),
                     init_health=(%s),
                     init_tStatus= (%s),
                     init_tracking_reason=(%s),
                     init_log_date= (%s)
                     WHERE init_id = (%s)
                  """, params)

    connect().cursor().close()

def edit_init_2(params):
    c = connect().cursor()
    c.execute("""UPDATE initiative
                         SET init_pManager = (%s),
                         init_pArchitect= (%s),
                         init_sArchitect= (%s),
                         init_pmo_team=(%s),
                         init_it_owner= (%s)
                         WHERE init_id = (%s)
                      """, params)
    connect().cursor().close()

def edit_init_3(params):
    c = connect().cursor()
    c.execute("""UPDATE initiative
                            SET init_existing_tech = (%s),
                            init_new_tech= (%s),
                            init_deploy_type= (%s)
                            WHERE init_id = (%s)
                        """, params)
    connect().cursor().close()

def edit_init_4(params):
    c = connect().cursor()
    c.execute("""UPDATE initiative
                            SET init_description = (%s),
                            init_bus_prob= (%s),
                            init_IT_objectives= (%s),
                            init_strategic_obj=(%s)
                            WHERE init_id = (%s)
                        """, params)
    connect().cursor().close()

def edit_init_6(params):
    c = connect().cursor()
    c.execute("""UPDATE initiative
                            SET init_bus_criticality = (%s),
                            init_domain= (%s),
                            init_live= (%s),
                            init_date_live= (%s),
                            init_decom_impact= (%s),
                            init_sgt_support= (%s)
                            WHERE init_id = (%s)
                        """, params)
    connect().cursor().close()

def edit_init_7(params):
    c = connect().cursor()
    c.execute("""UPDATE initiative
                            SET init_cost_center = (%s),
                            init_budget= (%s)
                            WHERE init_id = (%s)
                        """, params)

    connect().cursor().close()

#get list of vendors for a specific initiative (returns list of names)
def get_vendor_list(initiative_id):
    c = connect().cursor()
    c.execute("select vendor_id from init_vendor where init_id=?",(initiative_id,))
    vendor_id_list = c.fetchall()
    vendors = []
    for v in vendor_id_list:
        c.execute("select vendor_name from vendor where vendor_id=?",(v[0],))
        #name in form of tuple
        name = c.fetchone()
        vendors.append(name[0])

    return vendors

#get list of implementation partners for a specific initiative (returns list of names)
def get_imp_partner_list(initiative_id):
    c = connect().cursor()
    c.execute("select imp_partner_id from init_implement where init_id=?",(initiative_id,))
    imp_id_list = c.fetchall()
    imp_partners = []
    for v in imp_id_list:
        c.execute("select imp_partner_name from imp_partner where imp_partner_id=?",(v[0],))
        #name in form of tuple
        name = c.fetchone()
        imp_partners.append(name[0])

    return imp_partners

def get_initId(init_name, cluster, segment,business_unit):
    c = connect().cursor()
    c.execute("select init_id from initiative where init_name = ? AND init_cluster = ? AND init_segment = ? AND init_bus_unit = ? AND init_log_date = ?",(init_name, cluster, segment,business_unit,date.today().strftime("%Y-%m-%d"),))
    initId = c.fetchall()
    #init_id = init_id[0]
    print(initId)
    connect().cursor().close()
    return initId

#function to add into vendor list bridging table - Yousuf
def insert_innit_vendor(initiative_id, vendor):
    c = connect().cursor()
    for v in vendor:
        c.execute("select vendor_id from vendor where vendor_name = ?", (v,))
        vendor_id = c.fetchone()
        print("ven")
        print(vendor_id[0])
        print("init")
        print(initiative_id[0])
        c.execute("insert into init_vendor(vendor_id,init_id) values (?,?)", (vendor_id[0], initiative_id[0],))
    connect().cursor().close()

def insert_innit_imp(initiative_id, impPart):
    c = connect().cursor()
    for i in impPart:
        c.execute("select imp_partner_id from imp_partner where imp_partner_name = ?", (i,))
        imp_id = c.fetchone()
        print("imp")
        print(imp_id[0])
        print("init")
        print(initiative_id[0])
        c.execute("insert into init_implement(imp_partner_id,init_id) values (?,?)",(imp_id[0], initiative_id[0],))
    connect().cursor().close()


#function to add/delete vendors linked to a specific initiative
def edit_init_vendor(initiative_id, new_vendor_list):
    c = connect().cursor()
    #get curr list of vendors (names) linked to an initiative
    curr_vendor_list = get_vendor_list(initiative_id)
    #print(curr_vendor_list)
    #print(new_vendor_list)
    for v in curr_vendor_list:
        if v not in new_vendor_list:
            c.execute("select vendor_id from vendor where vendor_name = ?",(v,))
            # in the tuple form (id,)
            vendor_id = c.fetchone()
            #print(vendor_id)
            c.execute("delete from init_vendor where init_id = ? and vendor_id = ?",(initiative_id,vendor_id[0],))

    for v in new_vendor_list:
        if v not in curr_vendor_list:
            c.execute("select vendor_id from vendor where vendor_name = ?",(v,))
            vendor_id = c.fetchone()
            c.execute("insert into init_vendor(vendor_id,init_id) values (?,?)",(vendor_id[0],initiative_id,))

#function to add/delete imp_partners linked to a specific initiative
def edit_init_imp_partner(initiative_id, new_imp_partner_list):
    c = connect().cursor()

    curr_imp_partner_list = get_imp_partner_list(initiative_id)

    for v in curr_imp_partner_list:
        if v not in new_imp_partner_list:
            c.execute("select imp_partner_id from imp_partner where imp_partner_name = ?",(v,))
            # in the tuple form (id,)
            imp_partner_id = c.fetchone()
            c.execute("delete from init_implement where init_id = ? and imp_partner_id = ?",(initiative_id,imp_partner_id[0],))

    for v in new_imp_partner_list:
        if v not in curr_imp_partner_list:
            c.execute("select imp_partner_id from imp_partner where imp_partner_name = ?",(v,))
            imp_partner_id = c.fetchone()
            c.execute("insert into init_implement(imp_partner_id,init_id) values (?,?)",(imp_partner_id[0],initiative_id,))



# Samkelo's Code
def get_clusters():
    c = connect().cursor()
    c.execute("SELECT * FROM cluster")
    clusters = c.fetchall()
    return clusters


def get_segments():
    c = connect().cursor()
    c.execute("""SELECT segment_id, segment_name, c.cluster_name
                 FROM segment s
                 JOIN cluster c
                 ON s.cluster_id = c.cluster_id
              """)
    segments = c.fetchall()
    return segments


def input_cluster(c_name):
    c = connect().cursor()
    params = (c_name,)
    c.execute("""INSERT INTO 
                 cluster (cluster_name) 
                 VALUES (%s)
              """, params)
    connect().cursor().close()


def input_segment(s_name, c_id):
    c = connect().cursor()
    params = (s_name, int(c_id))
    c.execute("""INSERT INTO 
                 segment (segment_name, cluster_id)
                 VALUES (%s,%s)
              """, params)
    get_segments()
    connect().cursor().close()


def get_cluster_id(c_name):
    c = connect().cursor()
    params = (c_name,)
    c.execute("""SELECT cluster_id
                 FROM cluster 
                 WHERE cluster_name = (%s)""", params)
    c_id = c.fetchall()
    connect().cursor().close()
    return c_id[0][0]


def edit_segment(s_id, s_name, c_id):
    params = (s_name, int(c_id), int(s_id))
    c = connect().cursor()
    c.execute("""UPDATE segment
                 SET segment_name = (%s),
                     cluster_id = (%s)
                 WHERE segment_id = (%s)
              """, params)
    get_segments()
    connect().cursor().close()


def edit_cluster(c_id, c_name):
    params = (c_name, int(c_id))
    c = connect().cursor()
    c.execute("""UPDATE cluster
                 SET cluster_name = (%s)
                 WHERE cluster_id = (%s)
              """, params)
    get_segments()
    connect().cursor().close()


#Nick's Code
#function to get countries
def get_country():
    c = connect().cursor()
    c.execute("select * from country")
    country = c.fetchall()
    return country


# Function to get all meetings
def get_meetings():
    statement = """ SELECT m.meet_id, m.meet_date
                        FROM meet m
                    """
    variables = ()
    meet_results = db_ops.query(statement, variables)
    #print(meet_results)

    # empty list to store meetings
    meetings = []

    for meet in meet_results:
        meet_id = meet[0]  # Get meeting ID

        statement2 = """SELECT i.init_name
                            from init_meeting_bridge b
                            join meet m on b.meet_id = m.meet_id
                            join initiative i on b.init_id = i.init_id
                            WHERE m.meet_id = (%s)
                         """
        variables2 = (int(meet_id),)
        init_results2 = db_ops.query(statement2, variables2)
        #print(init_results2)

        # Empty tuple to store all initiatives
        initiatives = ()

        if init_results2:
            for init in init_results2:
                initiatives += init

            # Make tuple comma separated values
            s = ', '.join(map(str, initiatives))

            # Concatenate meeting and initiatives and append meeting to Meetings
            meetings.append(meet + (s,))
        else:
            s = "TBD"
            meetings.append(meet + (s,))
            print(meetings)

    return meetings


# Function to accept user input for "add meeting" button and insert that date into the db
def insert_meet_date(meeting_date):
    c = connect().cursor()
    params = (meeting_date,)
    #print(params)
    c.execute("""INSERT INTO meet (meet_date)
                VALUES (%s)
                  """, params)
    # ("""INSERT INTO
    #                  segment (segment_name, cluster_id)
    #                  VALUES (%s,%s)
    #               """, params)


    connect().cursor().close()


# Function to link meeting id and initiative id and insert in bridging table
def insert_meetinit(initiative_id, meeting_id):
    # valid = bridgecheck(initiative_id, meeting_id) # valid will hold either 0 or 1
    # #print(valid)
    #
    # if valid == True:
    #     return True

    c = connect().cursor()
    params = (initiative_id, meeting_id)
    c.execute("""INSERT INTO init_meeting_bridge (init_id, meet_id)
                VALUES (%s, %s)
                  """, params)
    connect().cursor().close()


# this function is for validation of meeting and initiative bridging table
def bridgecheck(initiative_id, meeting_id):
    compdata = (initiative_id, meeting_id)
    # this returns a list of tuples
    query = """ SELECT init_id, meet_id
                            FROM init_meeting_bridge
                        """
    variables =()
    result = db_ops.query(query, variables)

    for i in range(len(result)):
        # print(result[i])
        if compdata == result[i]: # you want to make sure that y
            return True # this means that the data is already present
    return False

# Function to query the meeting_init bridge table
def query_meetinit_bridge(meetid):
    query = """ SELECT i.init_name
    FROM initiative i
    JOIN
    init_meeting_bridge m
    ON i.init_id = m.init_id
    WHERE m.meet_id = """ + str(meetid)

    variables = ()
    result = db_ops.query(query, variables)
    return result

#logging an initiative
def log_init(params):
    c = connect().cursor()
    #print("params are")
    #print(params)
    if (params[29] == ''):
        c.execute("""INSERT INTO initiative 
                (init_id, init_name, init_bus_unit, init_cost_center, init_budget, init_bus_prob, init_IT_objectives, init_description, init_log_date,
                init_capability_description, init_domain, init_new_tech, init_existing_tech, init_tStatus, init_purpose, init_health, init_country, init_it_owner,
                init_pArchitect, init_cluster, init_segment, init_sArchitect, init_decom_impact, init_bus_criticality, init_strategic_obj, init_pManager,
                init_deploy_type, init_stage, init_sgt_support, init_pmo_team, init_live, init_date_live, init_tracking_reason)
                VALUES (DEFAULT,?,?,?,?,?,?,?,DEFAULT,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,DEFAULT,?)
                """, params)
    else:
        c.execute("""INSERT INTO initiative 
            (init_id, init_name, init_bus_unit, init_cost_center, init_budget, init_bus_prob, init_IT_objectives, init_description, init_log_date,
            init_capability_description, init_domain, init_new_tech, init_existing_tech, init_tStatus, init_purpose, init_health, init_country, init_it_owner,
            init_pArchitect, init_cluster, init_segment, init_sArchitect, init_decom_impact, init_bus_criticality, init_strategic_obj, init_pManager,
            init_deploy_type, init_stage, init_sgt_support, init_pmo_team, init_live, init_date_live, init_tracking_reason)
            VALUES (DEFAULT,?,?,?,?,?,?,?,DEFAULT,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            """, params)
    connect().cursor().close()

def get_meet_dates():
    c = connect().cursor()
    c.execute("select meet_date from meet")
    meet_date_list = c.fetchall()
    #print(meet_date_list)
    return meet_date_list
from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort
from CreditApp.modules import db_ops

bp = Blueprint('AdminCRUD', __name__)


@bp.route('/edit/edit-index')
def edit():
    return render_template('edit/edit-Index.html')


@bp.route('/edit/edit_vendors', methods=('GET', 'POST'))
def edit_vendors():
    vendors = db_ops.get_vendors()
    print(vendors)
    if request.method == 'POST':
        v_name = request.form['vendor_name']
        print(v_name)
        db_ops.input_vendor(v_name)

    return render_template('edit/edit_vendors.html', vendors=vendors)


@bp.route('/')
def index():
    return render_template('account_page.html')


# Krithi's Code

# functions to fetch all entries from capability 0, capability 1 and capability 2. Returns a list of tuples
def fetch_cap_0():
    cap_0 = db_ops.get_cap_0()
    return cap_0


def fetch_cap_1():
    cap_1 = db_ops.get_cap_1()
    return cap_1


def fetch_cap_2():
    cap_2 = db_ops.get_cap_2()
    return cap_2


# individual entries from capability 1 / capability 2 are in the form of a tuple (pk_id,name,fk_id)
# the function below append capability foreign key NAME to each individual tuple from capability 1 or 2 to get form (pk_id,name,fk_id,fk_name)
# returns a list of tuples
def fetch_cap_fk(cap, level):
    # list to hold all capability 1 or 2 entries, along with their foreign key names
    new_cap = []

    # c is a tuple
    for c in cap:
        # the tuple c is appended with the fk name. fk_name is collected using function get_cap_fk which is found in db_ops file
        c = c + db_ops.get_cap_fk(c[2], level)
        # add these entries to list created above
        new_cap.append(c)

    return new_cap


# Adding capability functions. We call different functions to add to db, depending on capabilitylevel
def add_capability_0(c_name):
    if (c_name != ""):
        db_ops.add_cap_0(c_name)
        print("Go")


def add_capability_1(c_name, fk_0):
    if (c_name != "" and fk_0 != ""):
        db_ops.add_cap_1(c_name, fk_0)


def add_capability_2(c_name, fk_0):
    if (c_name != "" and fk_0 != ""):
        db_ops.add_cap_2(c_name, fk_0)


# basic edit function for all capabilities. different function is called depending on what capability level you are editing
def edit_capability(old_name, new_name, level):
    # preventing add to be clicked without entering a name
    if (new_name != ""):

        if level == '0':
            db_ops.edit_cap_0(old_name, new_name)
        elif level == '1':
            db_ops.edit_cap_1(old_name, new_name)
        elif level == '2':
            db_ops.edit_cap_2(old_name, new_name)


@bp.route('/edit/view_capability', methods=('GET', 'POST'))
def view_capability():
    # list that will be loaded with capability 0/1/2 entries that user wants to be viewed
    cap = []
    # when page loads initially you have no selected capability level that is being viewed
    level = ''
    # list of the foreign keys for either capability 1 / 2
    fk_cap = []

    if request.method == 'POST':

        print(request.form['submit-btn'])

        # when changing view between different Capability levels View button is clicked
        if request.form['submit-btn'] == "View":
            level = request.form['level']

            if level == '0':
                cap = fetch_cap_0()

            elif level == '1':
                cap = fetch_cap_1()
                cap = fetch_cap_fk(cap, level)
                # all possible fk's for level 1 are fetched (only capability 0 entries)
                fk_cap = fetch_cap_0()

            elif level == '2':
                cap = fetch_cap_2()
                cap = fetch_cap_fk(cap, level)
                # all possible fk's for level 2 are fetched (only capability 1 entries)
                fk_cap = fetch_cap_1()

        # Adding to Capability 0
        elif request.form['submit-btn'] == "Add_0":
            c_name = request.form['add_name']
            print(c_name)
            add_capability_0(c_name)

        # Adding to Capability 1
        elif request.form['submit-btn'] == "Add_1":
            c_name = request.form['add_name']
            fk_0 = request.form['fk_0']
            add_capability_1(c_name, fk_0)

        # Adding to Capability 2
        elif request.form['submit-btn'] == "Add_2":
            c_name = request.form['add_name']
            fk_1 = request.form['fk_1']
            add_capability_2(c_name, fk_1)

        # If Edit button is selected
        elif "Edit" in request.form['submit-btn']:
            # value of button will be in the form Edit_"level value"
            # getting button value
            get_level = request.form['submit-btn']
            # get level number from button value
            level = get_level[-1]

            new_name = request.form['new_name']
            old_name = request.form['old_name']

            edit_capability(old_name, new_name, level)

    return render_template('AdminCRUD/edit_capability.html', cap=cap, level=level, fk_cap=fk_cap)


# Samkelo's Code
@bp.route('/edit/edit_clusters', methods=('GET', 'POST'))
def edit_clusters():
    if request.method == 'POST':
        c_id = request.form["c_id"]  # cluster ID
        c_name = request.form["c_name"]  # cluster Name
        mode = request.form["mode"]  # check if we're editing or adding

        if mode == "add":
            db_ops.input_cluster(c_name)  # call function to add new cluster

        elif mode == "edit":
            db_ops.edit_cluster(c_id, c_name)  # call function to edit selected cluster

        else:
            print("Something went wrong")

    return render_template('AdminCRUD/edit_clusters.html', clusters=db_ops.get_clusters())


@bp.route('/edit/edit_segments', methods=('GET', 'POST'))
def edit_segments():
    if request.method == 'POST':
        mode = request.form["mode"]  # are we adding or editing?
        s_id = request.form["s_id"]  # segment ID
        s_name = request.form["s_name"]  # segment Name
        c_name = request.form["c_name"]  # cluster Name
        c_id = db_ops.get_cluster_id(c_name)  # cluster ID

        if mode == "add":
            db_ops.input_segment(s_name, c_id)  # call function to add new segment

        elif mode == "edit":
            db_ops.edit_segment(s_id, s_name, c_id)  # call function to edit selected segment

        else:
            print("something went wrong")

    return render_template('AdminCRUD/edit_segments.html', clusters=db_ops.get_clusters(),
                           segments=db_ops.get_segments())

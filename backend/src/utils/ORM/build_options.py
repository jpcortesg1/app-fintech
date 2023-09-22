from sqlalchemy.orm import joinedload, load_only

# The build_options function constructs options for the joinedload function used to perform eager loading of relational data in SQLAlchemy. The includes parameter is a list of objects that define the relationships to be loaded. Each object in the list should have a include key that specifies the related model and may have the where, entities, and includes keys. If a where clause is specified, a condition is created and passed to the relationship to filter the results. If the entities or includes keys are specified, they are passed to the relationship as options. The function uses recursion to process nested relationships. It returns a list of options for joinedload that can be passed to a SQLAlchemy query.


def build_options(includes=[]):
    # Create array that have all relationships
    joinedloads = []

    for include in includes:
        # Create array that have current relationship
        option = []

        #  Get model
        model = include['include']

        # Check if model exists
        # If no exist model no exist relationship
        # if model == None:
        #     continue

        # Get possible parameters
        where = include.get('where', [])
        entities = include.get('entities', [])
        new_includes = include.get('includes', [])

        # If exist where then create condition and pass this condition to relationship
        if where and len(where) > 0:
            condition = model.and_(*where)
            relation = joinedload(condition)
        #  If not exist where then pass only relationship
        else:
            relation = joinedload(model)

        # If not exist entities or includes finish this relationship
        # And add to options
        if entities and new_includes and len(entities) == 0 and len(new_includes) == 0:
            joinedloads.append(relation)
            continue

        #  To pass entities or includes into options
        to_pass_options = []

        if entities and len(entities) > 0:
            labels = [load_only(*entities)]
            to_pass_options.append(
                *labels
            )

        if new_includes and len(new_includes) > 0:
            more_options = build_options(new_includes)
            for option in more_options:
                to_pass_options.append(option)

        # Add to options
        relation = relation.options(*to_pass_options)
        joinedloads.append(relation)

    return joinedloads

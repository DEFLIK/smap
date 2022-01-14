class RequestInfo:
    def __init__(self, city, s_year, e_year, area, org, rank, award, username):
        self.city = city
        self.start_year = s_year
        self.end_year = e_year
        self.area = area
        self.organization = org
        self.rank = rank
        self.award = award
        self.username = username

    def __str__(self):
        return "{0} {1} {2} {3} {4} {5} {6} {7}".format(self.city, self.start_year, self.end_year,
                         self.area, self.organization, self.rank, self.award, self.username)
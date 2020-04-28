#ifndef GEOMETRY_H
#define	GEOMETRY_H

class Geometry
{
public:
	Geometry(std::string name, std::string type) :
		m_name(name),
		m_type(type)
	{}
	std::string getName() { return m_name; };
	std::string getType() { return m_type; };
	virtual double computeVolume() = 0;
	virtual double computeSurface() = 0;

private:
	std::string m_name;
	std::string m_type;
};

#endif
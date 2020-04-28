#ifndef SPHERE_H
#define SPHERE_H

#include "Geometry.h"

class Sphere : public Geometry
{
public:
	Sphere(std::string name, double radius);
	std::string getName() { return m_name; };
	std::string getType() { return m_type; };
	double computeVolume();
	double computeSurface();

private:
	std::string m_name;
	std::string m_type = "Sphere";
	double m_radius;
};

#endif
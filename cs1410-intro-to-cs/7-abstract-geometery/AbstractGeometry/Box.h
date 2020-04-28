#ifndef BOX_H
#define BOX_H

#include "Geometry.h"

class Box : public Geometry
{
public:
	Box(std::string name, double length, double width, double height);
	std::string getName() { return m_name; };
	std::string getType() { return m_type; };
	double computeVolume();
	double computeSurface();

private:
	std::string m_name;
	std::string m_type = "Box";
	double m_length;
	double m_width;
	double m_height;
};

#endif
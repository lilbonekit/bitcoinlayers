"use client";

import { Layer } from "./layerProps";
import { getRiskColorBackground, getRiskColorIcon } from "@/util/riskColors";
import RiskSnapshot from "./riskSnapshot";
import RiskIconBridge from "@/components/icons/RiskIconBridge";
import RiskIconDA from "@/components/icons/RiskIconDA";
import RiskIconOperators from "@/components/icons/RiskIconOperators";
import RiskIconSettlement from "@/components/icons/RiskIconSettlement";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { isMobile } from "react-device-detect";

const LayerDiamond: React.FC<{ layer: Layer }> = ({ layer }) => {
    const containerSize = 350;
    const svgDivSize = containerSize / 2;
    const svgSize = 215;

    const renderDiamond = (
        riskFactor: string,
        positionTop: number,
        positionLeft: number,
        IconComponent: React.FC<{
            fill: string;
            width?: string;
            height?: string;
        }>,
    ) => {
        const bgColor = getRiskColorBackground(riskFactor);
        const fillColor = getRiskColorIcon(riskFactor);
        return (
            <div
                className="absolute"
                style={{
                    width: svgDivSize,
                    height: svgDivSize,
                    top: positionTop,
                    left: positionLeft,
                }}
            >
                <svg
                    viewBox={`0 0 ${svgSize * 1} ${svgSize * 2}`}
                    width={svgSize}
                    height={svgSize}
                    className="relative flex-col justify-start items-start flex"
                >
                    <rect
                        x={70}
                        y={40}
                        width={svgSize}
                        height={svgSize}
                        transform={`rotate(45 70 40)`}
                        style={{ fill: bgColor }}
                        rx={svgSize / 10}
                        ry={svgDivSize / 10}
                    />
                    <foreignObject
                        x="0"
                        y="115"
                        width="145"
                        height="145"
                        className="flex justify-center items-center"
                    >
                        <div className="w-full h-full flex justify-center items-center">
                            <IconComponent
                                fill={fillColor}
                                width="100px"
                                height="100px"
                            />
                        </div>
                    </foreignObject>
                    {/* <text
                        x="33%"
                        y="55%"
                        textAnchor="middle"
                        fill={fillColor}
                        className="font-bold text-3xl"
                    >
                        {riskFactor} Risk
                    </text> */}
                </svg>
            </div>
        );
    };

    const containerClassName = `lg:w-[${containerSize}px] h-[${containerSize}px] lg:h-full flex justify-center items-center relative ml-0 z-30 cursor-pointer`;

    const riskLabels = [
        {
            text: "BRIDGE",
            className:
                "left-[10px] top-[155px] -rotate-45 origin-top-left text-left",
        },
        {
            text: "DATA AVAILABILITY",
            className:
                "left-[51%] translate-x-[-50%] top-[-8px] origin-top-left text-center w-[80px]",
        },
        {
            text: "OPERATORS",
            className:
                "right-[10px] top-[155px] rotate-45 origin-top-right text-right",
        },
        {
            text: "SETTLEMENT ASSURANCE",
            className:
                "left-[51%] translate-x-[-50%] top-[355px] origin-top-left text-center w-[80px]",
        },
    ];

    const diamondPositions = [
        { top: svgDivSize * 0.5, left: svgDivSize * 0.0, Icon: RiskIconBridge },
        { top: svgDivSize * 0.0, left: svgDivSize * 0.5, Icon: RiskIconDA },
        {
            top: svgDivSize * 0.5,
            left: svgDivSize * 1.0,
            Icon: RiskIconOperators,
        },
        {
            top: svgDivSize * 1.0,
            left: svgDivSize * 0.5,
            Icon: RiskIconSettlement,
        },
    ];

    const renderContent = () => (
        <>
            {riskLabels.map((label, index) => (
                <div
                    key={index}
                    className={`absolute text-slate-600 text-xs font-medium leading-none ${label.className}`}
                >
                    {label.text}
                </div>
            ))}

            {diamondPositions.map((position, index) =>
                renderDiamond(
                    layer.riskAnalysis[index].tier,
                    position.top,
                    position.left,
                    position.Icon,
                ),
            )}
        </>
    );

    return isMobile ? (
        <Popover>
            <PopoverTrigger className={containerClassName}>
                {renderContent()}
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-16px)] mx-auto max-w-[500px]">
                <RiskSnapshot layer={layer} />
            </PopoverContent>
        </Popover>
    ) : (
        <HoverCard openDelay={300}>
            <HoverCardTrigger className={containerClassName}>
                {renderContent()}
            </HoverCardTrigger>
            <HoverCardContent className="w-[calc(100vw-16px)] mx-auto max-w-[500px]">
                <RiskSnapshot layer={layer} />
            </HoverCardContent>
        </HoverCard>
    );
};

export default LayerDiamond;

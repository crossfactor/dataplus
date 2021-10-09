import { trigger, state, style, transition,
    animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'max-height': '800px', 'opacity': '1', 'visibility': 'visible'
        })),
        state('out', style({
            'height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('in => out', [group([
            animate('150ms ease-in-out', style({
                'opacity': '0'
            })),
            animate('250ms ease-in-out', style({
                'height': '0px'
            })),
            animate('250ms ease-in-out', style({
                'visibility': 'hidden'
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('1ms ease-in-out', style({
                'visibility': 'visible'
            })),
            animate('500ms ease-in-out', style({
                'height': '*'
            })),
            animate('900ms ease-in-out', style({
                'opacity': '1'
            }))
        ]
        )])
    ]),
];



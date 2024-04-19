'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlertIcon, CrownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const characterStatsSchema = z.object({
    attackSpeed: z.number(),
    reloadSpeed: z.number(),
    ammoCapacity: z.number(),
    headshotDamage: z.number(),
    bodyDamage: z.number(),
    damageVsInfected: z.number(),
    damageVsMutated: z.number(),
});

const weaponStatsSchema = z.object({
    bodyDamagePerHit: z.number(),
    headshotDamagePerHit: z.number(),
    attacksPerSecond: z.number(),
    reloadTime: z.number(),
    clipSize: z.number(),
    weaponAttackSpeed: z.number(),
    weaponReloadSpeed: z.number(),
    weaponAmmoCapacity: z.number(),
    weaponHeadshotDamage: z.number(),
    weaponBodyDamage: z.number(),
    damageVsInfected: z.number(),
    damageVsMutated: z.number(),
});

export default function Dps() {
    const [hasExpertSkill, setHasExpertSkill] = useState(true);

    const t = useTranslations('DpsCalculatorPage');

    const characterStatsFrom = useForm<z.infer<typeof characterStatsSchema>>({
        mode: 'onChange',
        resolver: zodResolver(characterStatsSchema),
        defaultValues: {
            attackSpeed: 0,
            reloadSpeed: 0,
            ammoCapacity: 0,
            headshotDamage: 0,
            bodyDamage: 0,
            damageVsInfected: 0,
            damageVsMutated: 0,
        },
    });

    const weaponStatsFrom = useForm<z.infer<typeof weaponStatsSchema>>({
        mode: 'onChange',
        resolver: zodResolver(weaponStatsSchema),
        defaultValues: {
            bodyDamagePerHit: 0,
            headshotDamagePerHit: 0,
            attacksPerSecond: 0,
            reloadTime: 0,
            clipSize: 0,
            weaponAttackSpeed: 0,
            weaponReloadSpeed: 0,
            weaponAmmoCapacity: 0,
            weaponHeadshotDamage: 0,
            weaponBodyDamage: 0,
            damageVsInfected: 0,
            damageVsMutated: 0,
        },
    });

    const characterStats = characterStatsFrom.getValues();
    const weaponStats = weaponStatsFrom.getValues();

    const weaponOriginalBodyDamagePerHit = +(
        weaponStats.bodyDamagePerHit /
        (1 + weaponStats.weaponBodyDamage / 100)
    ).toFixed(2);
    const weaponOriginalHeadshotDamagePerHit = +(
        weaponStats.headshotDamagePerHit /
        (1 + weaponStats.weaponHeadshotDamage / 100)
    ).toFixed(2);
    const weaponOriginalAttackPerSecond = +(
        weaponStats.attacksPerSecond /
        (1 + weaponStats.weaponAttackSpeed / 100)
    ).toFixed(2);
    const weaponOriginalReloadTime = +(weaponStats.reloadTime * (1 + weaponStats.weaponReloadSpeed / 100)).toFixed(2);
    const weaponOriginalClipSize = +(weaponStats.clipSize / (1 + weaponStats.weaponAmmoCapacity / 100)).toFixed(2);

    const weaponFinalBodyDamagePerHit = +(
        weaponOriginalBodyDamagePerHit *
        (1 + (characterStats.bodyDamage + weaponStats.weaponBodyDamage + (hasExpertSkill ? 25 : 0)) / 100)
    ).toFixed(2);
    const weaponFinalHeadshotDamagePerHit = +(
        weaponOriginalHeadshotDamagePerHit *
        (1 + (characterStats.headshotDamage + weaponStats.weaponHeadshotDamage + (hasExpertSkill ? 25 : 0)) / 100)
    ).toFixed(2);
    const weaponFinalAttackPerSecond = +(
        weaponOriginalAttackPerSecond *
        (1 + (characterStats.attackSpeed + weaponStats.weaponAttackSpeed + (hasExpertSkill ? 25 : 0)) / 100)
    ).toFixed(2);
    const weaponFinalReloadTime = +(
        weaponOriginalReloadTime /
        (1 + (characterStats.reloadSpeed + weaponStats.weaponReloadSpeed) / 100)
    ).toFixed(2);
    const weaponFinalClipSize = +(
        weaponOriginalClipSize *
        (1 + (characterStats.ammoCapacity + weaponStats.weaponAmmoCapacity) / 100)
    ).toFixed(2);
    const weaponFinalDamageVsInfectedOnBody = +(
        ((weaponFinalBodyDamagePerHit * weaponFinalClipSize) /
            (weaponFinalClipSize / weaponFinalAttackPerSecond + weaponFinalReloadTime)) *
        (1 + (characterStats.damageVsInfected + weaponStats.damageVsInfected) / 100)
    ).toFixed(2);
    const weaponFinalDamageVsInfectedOnHead = +(
        ((weaponFinalHeadshotDamagePerHit * weaponFinalClipSize) /
            (weaponFinalClipSize / weaponFinalAttackPerSecond + weaponFinalReloadTime)) *
        (1 + (characterStats.damageVsInfected + weaponStats.damageVsInfected) / 100)
    ).toFixed(2);
    const weaponFinalDamageVsMutatedOnBody = +(
        ((weaponFinalBodyDamagePerHit * weaponFinalClipSize) /
            (weaponFinalClipSize / weaponFinalAttackPerSecond + weaponFinalReloadTime)) *
        (1 + (characterStats.damageVsMutated + weaponStats.damageVsMutated) / 100)
    ).toFixed(2);
    const weaponFinalDamageVsMutatedOnHead = +(
        ((weaponFinalHeadshotDamagePerHit * weaponFinalClipSize) /
            (weaponFinalClipSize / weaponFinalAttackPerSecond + weaponFinalReloadTime)) *
        (1 + (characterStats.damageVsMutated + weaponStats.damageVsMutated) / 100)
    ).toFixed(2);

    return (
        <div className="grow grid grid-cols-6 h-full gap-4">
            <div className="grid sm:grid-cols-3 col-span-6 xl:col-span-4 gap-4">
                <div className="grow col-span-3 sm:col-span-1">
                    <div className="flex justify-center gap-2 items-start">
                        <h2 className="text-2xl font-semibold text-center mb-2">{t('character-stats')}</h2>
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={hasExpertSkill ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={() => {
                                            setHasExpertSkill((prev) => !prev);
                                        }}
                                        className="w-8 h-8"
                                    >
                                        <CrownIcon className="w-5 h-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{t('expert-skill')}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Form {...characterStatsFrom}>
                        <form className="space-y-4">
                            <FormField
                                control={characterStatsFrom.control}
                                name="attackSpeed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('attack-speed') + '(%)'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                {...characterStatsFrom.register('attackSpeed', {
                                                    valueAsNumber: true,
                                                })}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={characterStatsFrom.control}
                                name="reloadSpeed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('reload-speed') + '(%)'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                {...characterStatsFrom.register('reloadSpeed', {
                                                    valueAsNumber: true,
                                                })}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={characterStatsFrom.control}
                                name="ammoCapacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('ammo-capacity') + '(%)'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                {...characterStatsFrom.register('ammoCapacity', {
                                                    valueAsNumber: true,
                                                })}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={characterStatsFrom.control}
                                name="headshotDamage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('headshot-damage') + '(%)'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                {...characterStatsFrom.register('headshotDamage', {
                                                    valueAsNumber: true,
                                                })}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={characterStatsFrom.control}
                                name="bodyDamage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('body-damage') + '(%)'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                {...characterStatsFrom.register('bodyDamage', {
                                                    valueAsNumber: true,
                                                })}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={characterStatsFrom.control}
                                name="damageVsInfected"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('damage-vs-infected') + '(%)'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                {...characterStatsFrom.register('damageVsInfected', {
                                                    valueAsNumber: true,
                                                })}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={characterStatsFrom.control}
                                name="damageVsMutated"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('damage-vs-mutated') + '(%)'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                {...characterStatsFrom.register('damageVsMutated', {
                                                    valueAsNumber: true,
                                                })}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <div className="grow col-span-3 sm:col-span-2">
                    <div className="flex justify-center gap-2 items-center mb-2 ">
                        <h2 className="text-2xl font-semibold text-center">{t('weapon-stats')}</h2>
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleAlertIcon />
                                </TooltipTrigger>
                                <TooltipContent sideOffset={15}>{t('weapon-stats-precaution')}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Form {...weaponStatsFrom}>
                        <form className="flex gap-4">
                            <div className="flex flex-col grow space-y-4">
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="bodyDamagePerHit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('body-damage-per-hit')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('bodyDamagePerHit', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="headshotDamagePerHit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('headshot-damage-per-hit')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('headshotDamagePerHit', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="attacksPerSecond"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('attacks-per-second')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('attacksPerSecond', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="reloadTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('reload-time') + '(s)'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('reloadTime', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="clipSize"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('clip-size')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('clipSize', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col grow space-y-4">
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="weaponAttackSpeed"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('weapon-attack-speed') + '(%)'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('weaponAttackSpeed', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="weaponReloadSpeed"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('weapon-reload-speed') + '(%)'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('weaponReloadSpeed', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="weaponAmmoCapacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('weapon-ammo-capacity') + '(%)'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('weaponAmmoCapacity', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="weaponHeadshotDamage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('weapon-headshot-damage') + '(%)'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('weaponHeadshotDamage', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="weaponBodyDamage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('weapon-body-damage') + '(%)'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('weaponBodyDamage', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="damageVsInfected"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('damage-vs-infected') + '(%)'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('damageVsInfected', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={weaponStatsFrom.control}
                                    name="damageVsMutated"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('damage-vs-mutated') + '(%)'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    {...weaponStatsFrom.register('damageVsMutated', {
                                                        valueAsNumber: true,
                                                    })}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="xl:col-span-2 col-span-6">
                <h2 className="text-2xl font-semibold text-center mb-6">{t('your-dps')}</h2>
                <div className="flex flex-col gap-4">
                    {/* <Card className="hover:bg-secondary">
                        <CardHeader>
                            <CardTitle>{t('dps-vs-infected-on-body')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{weaponFinalDamageVsInfectedOnBody}</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:bg-secondary">
                        <CardHeader>
                            <CardTitle>{t('dps-vs-infected-on-head')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{weaponFinalDamageVsInfectedOnHead}</p>
                        </CardContent>
                    </Card>
                    <Separator /> */}
                    <Card className="hover:bg-secondary">
                        <CardHeader>
                            <CardTitle>{t('dps-vs-mutated-on-body')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{weaponFinalDamageVsMutatedOnBody}</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:bg-secondary">
                        <CardHeader>
                            <CardTitle>{t('dps-vs-mutated-on-head')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{weaponFinalDamageVsMutatedOnHead}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
